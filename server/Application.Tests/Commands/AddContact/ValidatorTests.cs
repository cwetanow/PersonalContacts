using Application.Common.Contracts;
using FluentValidation.TestHelper;
using static Application.Commands.AddContact;

namespace Application.Tests.Commands.AddContact;
public class ValidatorTests
{
    [Fact]
    public void Should_Have_Validation_Error_When_FirstName_Is_Empty()
    {
        // Arrange
        var command = new Command(
           string.Empty,
           "Doe",
           new DateTime(1992, 5, 1),
           new Models.AddressDto
           {
               City = "City",
               Street = "Street"
           },
           "666-888-1444",
           "BG46STSA93008297336485"
           );

        var validator = new Validator(A.Fake<IIBANValidator>());

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_LastName_Is_Empty()
    {
        // Arrange
        var command = new Command(
           "John",
           string.Empty,
           new DateTime(1992, 5, 1),
           new Models.AddressDto
           {
               City = "City",
               Street = "Street"
           },
           "666-888-1444",
           "BG46STSA93008297336485"
           );

        var validator = new Validator(A.Fake<IIBANValidator>());

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.LastName);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_DateOfBirth_Is_Invalid()
    {
        // Arrange
        var command = new Command(
           "John",
           "Doe",
           new DateTime(),
           new Models.AddressDto
           {
               City = "City",
               Street = "Street"
           },
           "666-888-1444",
           "BG46STSA93008297336485"
           );

        var validator = new Validator(A.Fake<IIBANValidator>());

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.DateOfBirth);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_Address_Is_Null()
    {
        // Arrange
        var command = new Command(
           "John",
           "Doe",
           new DateTime(1992, 5, 1),
           null!,
           "666-888-1444",
           "BG46STSA93008297336485"
           );

        var validator = new Validator(A.Fake<IIBANValidator>());

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.Address);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_Address_Has_Invalid_Fields()
    {
        // Arrange
        var command = new Command(
           "John",
           "Doe",
           new DateTime(1992, 5, 1),
           new Models.AddressDto
           {
               City = string.Empty,
               Street = string.Empty
           },
           "666-888-1444",
           "BG46STSA93008297336485"
           );

        var validator = new Validator(A.Fake<IIBANValidator>());

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.Address.City);
        result.ShouldHaveValidationErrorFor(c => c.Address.Street);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_Phone_Number_Is_Invalid()
    {
        // Arrange
        var command = new Command(
           "John",
           "Doe",
           new DateTime(1992, 5, 1),
           new Models.AddressDto
           {
               City = "City",
               Street = "Street"
           },
           "66",
           "BG46STSA93008297336485"
           );

        var validator = new Validator(A.Fake<IIBANValidator>());

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.PhoneNumber);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_IBAN_Is_Invalid()
    {
        // Arrange
        var command = new Command(
           "John",
           "Doe",
           new DateTime(1992, 5, 1),
           new Models.AddressDto
           {
               City = "City",
               Street = "Street"
           },
           "661-555",
           "11111"
           );

        var fakeIbanValidator = A.Fake<IIBANValidator>();
        A.CallTo(() => fakeIbanValidator.IsValid(command.Iban))
            .Returns(false);

        var validator = new Validator(fakeIbanValidator);

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.Iban);
    }
}
