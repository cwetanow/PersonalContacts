using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence;
public static class ConfigureServices
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, string connectionString) => services
        .AddDbContext<PersonalContactsDbContext>(opts => opts.UseNpgsql(connectionString))
        .AddScoped<DbContext, PersonalContactsDbContext>();
}
