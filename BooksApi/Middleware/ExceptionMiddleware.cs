using Microsoft.AspNetCore.Mvc;

namespace BooksApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ExceptionMiddleware>
            _logger;

        public ExceptionMiddleware(
            RequestDelegate next,
            ILogger<ExceptionMiddleware> logger)
        {
            _next = next;

            _logger = logger;
        }

        public async Task InvokeAsync(
            HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Unhandled exception occurred");

                context.Response.StatusCode = 500;

                context.Response.ContentType =
                    "application/json";

                var response = new ProblemDetails
                {
                    Status = 500,

                    Title = "Server Error",

                    Detail =
                        "An unexpected error occurred"
                };

                await context.Response
                    .WriteAsJsonAsync(response);
            }
        }
    }
}