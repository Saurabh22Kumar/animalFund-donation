using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace AnimalCare.API.Models
{
    [Table("donations")]
    public class Donation : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("donor_name")]
        public string DonorName { get; set; } = string.Empty;

        [Column("donor_email")]
        public string DonorEmail { get; set; } = string.Empty;

        [Column("donor_phone")]
        public string? DonorPhone { get; set; }

        [Column("message")]
        public string? Message { get; set; }

        [Column("payment_id")]
        public string? PaymentId { get; set; }

        [Column("order_id")]
        public string OrderId { get; set; } = string.Empty;

        [Column("payment_signature")]
        public string? PaymentSignature { get; set; }

        [Column("is_verified")]
        public bool IsVerified { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }
}

// Request/Response DTOs
namespace AnimalCare.API.Models.DTOs
{
    public class CreateOrderRequest
    {
        public decimal Amount { get; set; }
        public string DonorName { get; set; } = string.Empty;
        public string DonorEmail { get; set; } = string.Empty;
        public string? DonorPhone { get; set; }
        public string? Message { get; set; }
    }

    public class CreateOrderResponse
    {
        public string OrderId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "INR";
        public string KeyId { get; set; } = string.Empty;
    }

    public class VerifyPaymentRequest
    {
        public string OrderId { get; set; } = string.Empty;
        public string PaymentId { get; set; } = string.Empty;
        public string Signature { get; set; } = string.Empty;
    }

    public class VerifyPaymentResponse
    {
        public bool Verified { get; set; }
        public string Message { get; set; } = string.Empty;
        public int? DonationId { get; set; }
    }
}
