using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;
public class PersonalContactEntityConfiguration : IEntityTypeConfiguration<PersonalContact>
{
    public void Configure(EntityTypeBuilder<PersonalContact> builder)
    {
        builder
           .HasKey(x => x.Id);

        builder.HasIndex(x => x.Id)
            .IsUnique();

        builder
            .OwnsOne(x => x.Address);

        builder
            .OwnsOne(x => x.PhoneNumber);

        builder
            .OwnsOne(x => x.Iban);

        builder
            .Property(x => x.DateOfBirth)
            .HasConversion(
                value => new DateTime(value.Year, value.Month, value.Day),
                dateTime => DateOfBirth.Create(dateTime)
                );
    }
}
