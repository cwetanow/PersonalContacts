using static Application.Commands.RenameContact;

namespace Application.Tests.Commands.RenameContact;
public class ValidatorTests
{
    [Fact]
    public void Should_Have_Validation_Error_When_FirstName_Is_Null()
    {
        // Arrange
        var command = new Command(Guid.NewGuid(), null, "Doe");
        var validator = new Validator();

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_FirstName_Is_Empty()
    {
        // Arrange
        var command = new Command(Guid.NewGuid(), "", "Doe");
        var validator = new Validator();

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_LastName_Is_Null()
    {
        // Arrange
        var command = new Command(Guid.NewGuid(), "John", null);
        var validator = new Validator();

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.LastName);
    }

    [Fact]
    public void Should_Have_Validation_Error_When_LastName_Is_Empty()
    {
        // Arrange
        var command = new Command(Guid.NewGuid(), "John", "");
        var validator = new Validator();

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(c => c.LastName);
    }

    [Fact]
    public void Should_Not_Have_Validation_Error_When_FirstName_And_LastName_Are_Valid()
    {
        // Arrange
        var command = new Command(Guid.NewGuid(), "John", "Doe");
        var validator = new Validator();

        // Act
        var result = validator.TestValidate(command);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }
}
