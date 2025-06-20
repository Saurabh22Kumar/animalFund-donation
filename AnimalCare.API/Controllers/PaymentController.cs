using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using AnimalCare.API.Models;
using AnimalCare.API.Models.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace AnimalCare.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Supabase.Client _supabase;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(
            IConfiguration configuration, 
            Supabase.Client supabase,
            ILogger<PaymentController> logger)
        {
            _configuration = configuration;
            _supabase = supabase;
            _logger = logger;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                _logger.LogInformation("Creating order for amount: {Amount}", request.Amount);

                string keyId = _configuration["Razorpay:KeyId"] ?? "";
                string keySecret = _configuration["Razorpay:KeySecret"] ?? "";

                if (string.IsNullOrEmpty(keyId) || string.IsNullOrEmpty(keySecret))
                {
                    _logger.LogError("Razorpay credentials not configured");
                    return BadRequest(new { error = "Payment configuration error" });
                }

                // Create Razorpay order
                RazorpayClient client = new RazorpayClient(keyId, keySecret);
                
                Dictionary<string, object> options = new Dictionary<string, object>
                {
                    ["amount"] = request.Amount * 100, // Amount in paise
                    ["currency"] = "INR",
                    ["receipt"] = Guid.NewGuid().ToString()
                };
                
                Order order = client.Order.Create(options);
                string orderId = order["id"].ToString();

                // Save donation record to Supabase
                var donation = new Donation
                {
                    Amount = request.Amount,
                    DonorName = request.DonorName,
                    DonorEmail = request.DonorEmail,
                    DonorPhone = request.DonorPhone,
                    Message = request.Message,
                    OrderId = orderId,
                    IsVerified = false,
                    CreatedAt = DateTime.UtcNow
                };

                var result = await _supabase.From<Donation>().Insert(donation);
                _logger.LogInformation("Donation record created with order ID: {OrderId}", orderId);

                return Ok(new CreateOrderResponse
                {
                    OrderId = orderId,
                    Amount = request.Amount,
                    Currency = "INR",
                    KeyId = keyId
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating order");
                return BadRequest(new { error = "Failed to create order" });
            }
        }

        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentRequest request)
        {
            try
            {
                _logger.LogInformation("Verifying payment for order: {OrderId}", request.OrderId);

                string keySecret = _configuration["Razorpay:KeySecret"] ?? "";
                
                // Verify signature
                string payload = request.OrderId + "|" + request.PaymentId;
                string signature = ComputeHMACSHA256(payload, keySecret);
                
                if (signature != request.Signature)
                {
                    _logger.LogWarning("Payment signature verification failed for order: {OrderId}", request.OrderId);
                    return BadRequest(new VerifyPaymentResponse 
                    { 
                        Verified = false, 
                        Message = "Invalid payment signature" 
                    });
                }

                // Update donation record in Supabase
                var donations = await _supabase
                    .From<Donation>()
                    .Where(d => d.OrderId == request.OrderId)
                    .Get();

                if (donations.Models.Count == 0)
                {
                    _logger.LogWarning("Donation record not found for order: {OrderId}", request.OrderId);
                    return BadRequest(new VerifyPaymentResponse 
                    { 
                        Verified = false, 
                        Message = "Donation record not found" 
                    });
                }

                var donation = donations.Models.First();
                donation.PaymentId = request.PaymentId;
                donation.PaymentSignature = request.Signature;
                donation.IsVerified = true;
                donation.UpdatedAt = DateTime.UtcNow;

                await donation.Update<Donation>();
                
                _logger.LogInformation("Payment verified and donation updated for order: {OrderId}", request.OrderId);

                return Ok(new VerifyPaymentResponse
                {
                    Verified = true,
                    Message = "Payment verified successfully",
                    DonationId = donation.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying payment for order: {OrderId}", request.OrderId);
                return BadRequest(new VerifyPaymentResponse 
                { 
                    Verified = false, 
                    Message = "Payment verification failed" 
                });
            }
        }

        [HttpGet("donations")]
        public async Task<IActionResult> GetDonations([FromQuery] int page = 1, [FromQuery] int limit = 50)
        {
            try
            {
                var donations = await _supabase
                    .From<Donation>()
                    .Where(d => d.IsVerified == true)
                    .Order("created_at", Supabase.Postgrest.Constants.Ordering.Descending)
                    .Range((page - 1) * limit, page * limit - 1)
                    .Get();

                return Ok(donations.Models);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching donations");
                return BadRequest(new { error = "Failed to fetch donations" });
            }
        }

        [HttpGet("donation/{id}")]
        public async Task<IActionResult> GetDonation(int id)
        {
            try
            {
                var donations = await _supabase
                    .From<Donation>()
                    .Where(d => d.Id == id)
                    .Get();

                if (donations.Models.Count == 0)
                {
                    return NotFound(new { error = "Donation not found" });
                }

                return Ok(donations.Models.First());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching donation with ID: {Id}", id);
                return BadRequest(new { error = "Failed to fetch donation" });
            }
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> HandleWebhook([FromBody] object payload)
        {
            try
            {
                // Handle Razorpay webhooks here
                // This would be used for production webhook verification
                _logger.LogInformation("Webhook received: {Payload}", payload);
                
                // For now, just return OK
                // In production, you'd verify the webhook signature and process events
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error handling webhook");
                return BadRequest(new { error = "Webhook processing failed" });
            }
        }

        private static string ComputeHMACSHA256(string data, string key)
        {
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var dataBytes = Encoding.UTF8.GetBytes(data);
            
            using var hmac = new HMACSHA256(keyBytes);
            var hash = hmac.ComputeHash(dataBytes);
            return Convert.ToHexString(hash).ToLower();
        }
    }
}
