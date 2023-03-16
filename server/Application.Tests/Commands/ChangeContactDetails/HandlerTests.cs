using Application.Common.Exceptions;
using Application.Common.Mapping;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

using static Application.Commands.ChangeContactDetails;

namespace Application.Tests.Commands.ChangeContactDetails;
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

        var command = new Command(id, new DateTime(1992, 5, 1), new Models.AddressDto(), "1111", "2222");

        // Act
        Func<Task> action = async () => await handler.Handle(command, default);

        // Assert
        await action.Should().ThrowAsync<EntityNotFoundException<PersonalContact>>();
    }

    [Fact]
    public async Task Should_Update_Contact_Details()
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

        var command = new Command(contact.Id, new DateTime(1991, 5, 1), new Models.AddressDto { Street = "str2", City = "city", ZipCode = "222" }, "1111", "2222");

        // Act
        await handler.Handle(command, default);

        // Assert
        var updatedContact = await context.Set<PersonalContact>().SingleOrDefaultAsync();
        updatedContact.Should().NotBeNull();

        updatedContact!.DateOfBirth.Year.Should().Be(command.DateOfBirth.Year);
        updatedContact!.DateOfBirth.Month.Should().Be(command.DateOfBirth.Month);
        updatedContact!.DateOfBirth.Day.Should().Be(command.DateOfBirth.Day);
        updatedContact.Address.Should().BeEquivalentTo(command.Address);
        updatedContact.PhoneNumber.Value.Should().Be(command.PhoneNumber);
        updatedContact.Iban.Value.Should().Be(command.Iban);
    }
}
