# 🚀 Supabase Setup Guide for AnimalCare Foundation

This guide will help you set up Supabase (free PostgreSQL database) for your ASP.NET Core backend.

## 📋 Step 1: Create Supabase Account

1. Visit [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with GitHub (recommended) or email
4. Create a new organization (if needed)

## 🗄️ Step 2: Create New Project

1. Click "New Project"
2. Choose your organization
3. Project details:
   - **Name:** `animalcare-foundation`
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (perfect for portfolio)

4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

## 🔧 Step 3: Get Connection Details

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://your-project-id.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📊 Step 4: Create Database Table

1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Paste this SQL to create the donations table:

```sql
-- Create donations table
CREATE TABLE public.donations (
    id BIGSERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    message TEXT,
    payment_id TEXT,
    order_id TEXT NOT NULL,
    payment_signature TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_donations_order_id ON public.donations(order_id);
CREATE INDEX idx_donations_payment_id ON public.donations(payment_id);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow API access
CREATE POLICY "Allow API access to donations" ON public.donations
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Grant permissions
GRANT ALL ON public.donations TO anon;
GRANT ALL ON public.donations TO authenticated;
GRANT USAGE ON SEQUENCE public.donations_id_seq TO anon;
GRANT USAGE ON SEQUENCE public.donations_id_seq TO authenticated;
```

4. Click "Run" to execute the SQL

## ⚙️ Step 5: Configure ASP.NET Core

1. Update your `appsettings.json` with your Supabase details:

```json
{
  "Supabase": {
    "Url": "https://your-actual-project-id.supabase.co",
    "AnonKey": "your-actual-anon-key-here"
  },
  "Razorpay": {
    "KeyId": "rzp_test_your_actual_key",
    "KeySecret": "your_actual_secret_here"
  }
}
```

## 🔐 Step 6: Security Setup

**Important: Never commit actual API keys to GitHub!**

1. Keep `appsettings.json` with real values local only
2. Use `appsettings.example.json` for repository
3. For deployment, use environment variables

## 🧪 Step 7: Test the Setup

1. Run your ASP.NET Core API:
   ```bash
   cd AnimalCare.API
   ~/.dotnet/dotnet run
   ```

2. Test the API endpoints:
   - `GET https://localhost:7001/swagger` - Swagger UI
   - `POST https://localhost:7001/api/payment/create-order`
   - `GET https://localhost:7001/api/payment/donations`

## 📊 Step 8: View Data in Supabase

1. Go to **Table Editor** in Supabase dashboard
2. Select `donations` table
3. View all donations in real-time
4. Use filters and sorting as needed

## 🎯 Free Tier Limits

Supabase Free Tier includes:
- ✅ **Database:** 500MB storage
- ✅ **API:** Unlimited requests
- ✅ **Auth:** 50,000 monthly active users
- ✅ **Realtime:** Unlimited connections
- ✅ **Storage:** 1GB file storage

**Perfect for portfolio projects!**

## 🔄 Optional: Enable Realtime

If you want real-time donation updates:

1. Go to **Database** → **Replication**
2. Enable replication for `donations` table
3. Your Angular app can listen to real-time changes

## 🚀 Next Steps

After setup:
1. Test create order API
2. Test payment verification
3. View donations in Supabase dashboard
4. Update Angular service to use your API
5. Deploy both frontend and backend

## 🆘 Troubleshooting

**Connection Issues:**
- Check Project URL format: `https://xxx.supabase.co`
- Verify anon key is complete (very long string)
- Ensure RLS policies are set correctly

**Permission Errors:**
- Check that anon user has table permissions
- Verify RLS policy allows API access

**API Errors:**
- Check ASP.NET Core logs for detailed errors
- Verify Supabase configuration in appsettings.json

Your Supabase database is now ready for the AnimalCare Foundation! 🐾💚
