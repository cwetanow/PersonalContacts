using Application.Common.Exceptions;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Persistence;
using static Application.Commands.RemoveContact;

namespace Application.Tests.Commands.RemoveContact;
public class HandlerTests
{
    [Fact]
    public async Task Should_Throw_EntityNotFoundException_When_Contact_Does_Not_Exist()
    {
        // Arrange
        var id = Guid.NewGuid();

        var options = new DbContextOptionsBuilder<PersonalContactsDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        using var context = new PersonalContactsDbContext(options);

        var handler = new Handler(context);

        // Act
        Func<Task> action = async () => await handler.Handle(new Command(id), default);

        // Assert
        await action.Should().ThrowAsync<EntityNotFoundException>();
    }

    [Fact]
    public async Task Should_Delete_Contact()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<PersonalContactsDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        using var context = new PersonalContactsDbContext(options);

        var contact = new PersonalContact(
            "John",
            "Doe",
            DateOfBirth.Create(new DateTime(1992, 5, 1)),
            new Address("City", "Street", null),
            new PhoneNumber("666-888-1444"),
            new Iban("BG46STSA93008297336485"));

        context.Add(contact);
        await context.SaveChangesAsync();

        var handler = new Handler(context);

        // Act
        await handler.Handle(new Command(contact.Id), default);

        // Assert
        var exists = await context.Set<PersonalContact>().AnyAsync();
        exists.Should().BeFalse();
    }
}
