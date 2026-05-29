using BooksApi.Data;
using BooksApi.Middleware;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using Serilog;

using System.Text;
using System.Text.Json.Serialization;


// =======================
// SERILOG CONFIGURATION
// =======================

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File(
        "Logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);


// =======================
// USE SERILOG
// =======================

builder.Host.UseSerilog();


// =======================
// CONTROLLERS
// =======================

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });


// =======================
// SWAGGER
// =======================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();


// =======================
// DB CONTEXT
// =======================

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString(
            "DefaultConnection")));


// =======================
// JWT AUTHENTICATION
// =======================

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            builder.Configuration["Jwt:Key"]!))
            };
    });


// =======================
// AUTHORIZATION
// =======================

builder.Services.AddAuthorization();


// =======================
// CORS
// =======================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


// =======================
// BUILD APP
// =======================

var app = builder.Build();

Log.Information("Application started");


// =======================
// SERILOG REQUEST LOGGING
// =======================

app.UseSerilogRequestLogging();


// =======================
// GLOBAL EXCEPTION MIDDLEWARE
// =======================

app.UseMiddleware<ExceptionMiddleware>();


// =======================
// SWAGGER
// =======================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}


// =======================
// HTTPS
// =======================

app.UseHttpsRedirection();


// =======================
// CORS
// =======================

app.UseCors("AllowReact");


// =======================
// AUTHENTICATION
// =======================

app.UseAuthentication();


// =======================
// AUTHORIZATION
// =======================

app.UseAuthorization();


// =======================
// MAP CONTROLLERS
// =======================

app.MapControllers();


// =======================
// RUN APP
// =======================
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();
}

app.Run();