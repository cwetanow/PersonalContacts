using Application.Common.Contracts;
using IbanNet.DependencyInjection.ServiceProvider;
using Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence;
public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services) => services
        .AddIbanNet()
        .AddTransient<IIBANValidator, IbanValidator>();
}
