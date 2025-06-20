#!/bin/bash

# 🚀 ASP.NET Core Integration Setup Script
# This script creates an ASP.NET Core Web API backend for AnimalCare Foundation

echo "🐾 AnimalCare Foundation - ASP.NET Core Integration"
echo "=================================================="

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK is not installed!"
    echo ""
    echo "🍎 For macOS, install .NET using one of these methods:"
    echo ""
    echo "Method 1: Using Homebrew (Recommended)"
    echo "brew install --cask dotnet"
    echo ""
    echo "Method 2: Direct Download"
    echo "Visit: https://dotnet.microsoft.com/download/dotnet/8.0"
    echo "Download: .NET 8.0 SDK (macOS x64 or ARM64)"
    echo ""
    echo "Method 3: Using the installer script"
    echo "curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel 8.0"
    echo ""
    echo "After installation, restart your terminal and run this script again."
    exit 1
fi

echo "✅ .NET SDK found: $(dotnet --version)"
echo ""

# Create the ASP.NET Core Web API project
echo "📦 Creating ASP.NET Core Web API project..."
dotnet new webapi -n AnimalCare.API --force

# Create solution file
echo "📄 Creating solution file..."
dotnet new sln -n AnimalCare --force

# Add projects to solution
echo "🔗 Adding projects to solution..."
dotnet sln add AnimalCare.API/AnimalCare.API.csproj

# Install required packages
echo "📦 Installing required NuGet packages..."
cd AnimalCare.API

# Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design

# Razorpay SDK
dotnet add package Razorpay

# Additional useful packages
dotnet add package FluentValidation.AspNetCore
dotnet add package Serilog.AspNetCore

cd ..

echo ""
echo "✅ ASP.NET Core project setup complete!"
echo ""
echo "📁 Project structure:"
echo "├── AnimalCare.sln"
echo "├── AnimalCare.API/"
echo "│   ├── Controllers/"
echo "│   ├── Models/"
echo "│   ├── Program.cs"
echo "│   └── appsettings.json"
echo "└── charitylite-client/ (your existing Angular app)"
echo ""
echo "🔧 Next steps:"
echo "1. Configure connection string in appsettings.json"
echo "2. Add Razorpay keys to configuration"
echo "3. Create database models and DbContext"
echo "4. Run database migrations"
echo "5. Update Angular services to use API"
echo ""
echo "📖 Full guide: ASPNET_INTEGRATION_GUIDE.md"
