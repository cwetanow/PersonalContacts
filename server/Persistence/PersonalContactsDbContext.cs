using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class PersonalContactsDbContext : DbContext
{
    public PersonalContactsDbContext(DbContextOptions<PersonalContactsDbContext> options)
        : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Addd the Postgres Extension for UUID generation
        modelBuilder.HasPostgresExtension("uuid-ossp");

        // define configurations
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }
}
