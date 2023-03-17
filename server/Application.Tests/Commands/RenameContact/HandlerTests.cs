using Application.Common.Exceptions;
using Application.Common.Mapping;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

using static Application.Commands.RenameContact;

namespace Application.Tests.Commands.RenameContact;
public class HandlerTests
{
    private readonly IMapper mapper;

    public HandlerTests()
    {
        mapper = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>()).CreateMapper();
    }

    [Fact]
    public async Task Should_Throw_EntityNotFoundException_When_Contact_Does_Not_Exist()
    {
        // Arrange
        var id = Guid.NewGuid();

        var options = new DbContextOptionsBuilder<PersonalContactsDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        using var context = new PersonalContactsDbContext(options);

        var handler = new Handler(context, mapper);

        // Act
        Func<Task> action = async () => await handler.Handle(new Command(id, "firstname", "lastname"), default);

        // Assert
        await action.Should().ThrowAsync<EntityNotFoundException>();
    }

    [Fact]
    public async Task Should_Rename_Contact()
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

        var handler = new Handler(context, mapper);

        var command = new Command(contact.Id, "firstname", "lastname");

        // Act
        await handler.Handle(command, default);

        // Assert
        var updatedContact = await context.Set<PersonalContact>().SingleOrDefaultAsync();
        updatedContact.Should().NotBeNull();
        updatedContact!.FirstName.Should().Be(command.FirstName);
        updatedContact.LastName.Should().Be(command.LastName);

    }
}
