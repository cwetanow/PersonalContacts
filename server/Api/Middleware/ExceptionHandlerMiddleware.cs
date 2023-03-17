using Application.Common.Exceptions;
using System.Net;
using System.Text.Json;

namespace Api.Middleware;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate next;

    public ExceptionHandlerMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            var (code, responseMessage) = exception switch
            {
                ValidationException validationException => (HttpStatusCode.BadRequest, JsonSerializer.Serialize(validationException.Errors)),
                EntityNotFoundException => (HttpStatusCode.NotFound, JsonSerializer.Serialize(new { error = exception.Message })),
                _ => (HttpStatusCode.InternalServerError, JsonSerializer.Serialize(new { error = exception.Message }))
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            await context.Response.WriteAsync(responseMessage);
        }
    }
}
