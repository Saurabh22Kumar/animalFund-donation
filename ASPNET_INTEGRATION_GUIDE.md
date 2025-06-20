# 🔄 ASP.NET Integration Guide - AnimalCare Foundation

This guide shows how to integrate ASP.NET Core with your existing Angular project to create a full-stack donation platform.

## 🎯 Integration Options

### Option 1: ASP.NET Core Web API + Angular SPA (Recommended)

**Architecture:**
```
├── AnimalCare.API/              # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Program.cs
├── charitylite-client/          # Your existing Angular app
└── AnimalCare.sln               # Solution file
```

**Benefits:**
- ✅ Secure payment processing on server
- ✅ Database integration
- ✅ API authentication & authorization
- ✅ Server-side validation
- ✅ Better security for Razorpay webhook handling

---

### Option 2: ASP.NET Core with Angular Template

**Architecture:**
```
├── AnimalCare.Web/
│   ├── Controllers/
│   ├── ClientApp/               # Your Angular app moved here
│   ├── Models/
│   └── Program.cs
```

**Benefits:**
- ✅ Single project deployment
- ✅ Integrated development experience
- ✅ Built-in SPA services

---

## 🚀 Quick Start: Adding ASP.NET Core Web API

### Step 1: Create ASP.NET Core Web API Project

```bash
# Navigate to your project root
cd /Users/saurabhkumar/Desktop/PROJECTS/fullstack/CharityLite

# Create new Web API project
dotnet new webapi -n AnimalCare.API

# Create solution file
dotnet new sln -n AnimalCare

# Add projects to solution
dotnet sln add AnimalCare.API/AnimalCare.API.csproj
```

### Step 2: Configure CORS for Angular

In `AnimalCare.API/Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS for Angular app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "https://your-domain.vercel.app")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### Step 3: Create Payment Controller

Create `AnimalCare.API/Controllers/PaymentController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace AnimalCare.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        
        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                string keyId = _configuration["Razorpay:KeyId"];
                string keySecret = _configuration["Razorpay:KeySecret"];
                
                RazorpayClient client = new RazorpayClient(keyId, keySecret);
                
                Dictionary<string, object> options = new Dictionary<string, object>();
                options.Add("amount", request.Amount * 100); // Amount in paise
                options.Add("currency", "INR");
                options.Add("receipt", Guid.NewGuid().ToString());
                
                Order order = client.Order.Create(options);
                
                return Ok(new
                {
                    orderId = order["id"].ToString(),
                    amount = request.Amount,
                    currency = "INR",
                    keyId = keyId
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("verify-payment")]
        public IActionResult VerifyPayment([FromBody] VerifyPaymentRequest request)
        {
            try
            {
                string keySecret = _configuration["Razorpay:KeySecret"];
                
                string payload = request.OrderId + "|" + request.PaymentId;
                string signature = ComputeHMACSHA256(payload, keySecret);
                
                if (signature == request.Signature)
                {
                    // Payment verified - Save to database
                    SaveDonation(request);
                    return Ok(new { verified = true });
                }
                
                return BadRequest(new { verified = false });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("webhook")]
        public IActionResult HandleWebhook([FromBody] object payload)
        {
            // Handle Razorpay webhooks securely
            return Ok();
        }

        private string ComputeHMACSHA256(string data, string key)
        {
            var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);
            var dataBytes = System.Text.Encoding.UTF8.GetBytes(data);
            
            using (var hmac = new System.Security.Cryptography.HMACSHA256(keyBytes))
            {
                var hash = hmac.ComputeHash(dataBytes);
                return Convert.ToHexString(hash).ToLower();
            }
        }

        private void SaveDonation(VerifyPaymentRequest request)
        {
            // Save donation to database
            // Implement your database logic here
        }
    }

    public class CreateOrderRequest
    {
        public decimal Amount { get; set; }
        public string DonorName { get; set; }
        public string DonorEmail { get; set; }
        public string Message { get; set; }
    }

    public class VerifyPaymentRequest
    {
        public string OrderId { get; set; }
        public string PaymentId { get; set; }
        public string Signature { get; set; }
    }
}
```

### Step 4: Add Database Support

Install Entity Framework Core:

```bash
cd AnimalCare.API
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

Create `Models/Donation.cs`:

```csharp
namespace AnimalCare.API.Models
{
    public class Donation
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string DonorName { get; set; }
        public string DonorEmail { get; set; }
        public string DonorPhone { get; set; }
        public string Message { get; set; }
        public string PaymentId { get; set; }
        public string OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsVerified { get; set; }
    }
}
```

Create `Data/ApplicationDbContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using AnimalCare.API.Models;

namespace AnimalCare.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        
        public DbSet<Donation> Donations { get; set; }
    }
}
```

### Step 5: Update Angular Service

Update your Angular service to use the ASP.NET API:

```typescript
// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7001/api'; // Your ASP.NET API URL

  constructor(private http: HttpClient) {}

  createOrder(donationData: any) {
    return this.http.post(`${this.apiUrl}/payment/create-order`, donationData);
  }

  verifyPayment(paymentData: any) {
    return this.http.post(`${this.apiUrl}/payment/verify-payment`, paymentData);
  }
}
```

---

## 🗄️ Database Integration Options

### Option 1: SQL Server (Production Ready)

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

**Connection String:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AnimalCareDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

### Option 2: SQLite (Development)

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

### Option 3: PostgreSQL (Free Cloud Option)

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

---

## 🔐 Security Enhancements

### 1. Authentication & Authorization

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### 2. Input Validation

```bash
dotnet add package FluentValidation.AspNetCore
```

### 3. Rate Limiting

```bash
dotnet add package AspNetCoreRateLimit
```

---

## 🚀 Deployment Options

### Option 1: Azure App Service
- Deploy ASP.NET API to Azure
- Deploy Angular to Vercel/Netlify
- Connect via CORS

### Option 2: Single Deployment
- Host both in Azure App Service
- Use ASP.NET Core SPA template

### Option 3: Docker Containers
- Containerize both applications
- Deploy to Azure Container Instances

---

## 📋 Migration Checklist

- [ ] Create ASP.NET Core Web API project
- [ ] Set up Entity Framework and database
- [ ] Move payment processing to server-side
- [ ] Update Angular services to use API
- [ ] Implement authentication (optional)
- [ ] Add input validation and error handling
- [ ] Set up proper CORS configuration
- [ ] Configure environment variables
- [ ] Test payment flow end-to-end
- [ ] Deploy and configure production settings

---

## 🎯 Benefits of Adding ASP.NET

### Security
- ✅ Server-side payment verification
- ✅ Secure API key storage
- ✅ Input validation and sanitization
- ✅ Rate limiting and DDoS protection

### Functionality
- ✅ Database integration
- ✅ User authentication
- ✅ Admin dashboard
- ✅ Donation analytics
- ✅ Email notifications
- ✅ Webhook handling

### Scalability
- ✅ Better performance for complex operations
- ✅ Caching strategies
- ✅ Background job processing
- ✅ Microservices architecture potential

---

Your AnimalCare Foundation will be much more robust and secure with ASP.NET Core backend! 🚀
