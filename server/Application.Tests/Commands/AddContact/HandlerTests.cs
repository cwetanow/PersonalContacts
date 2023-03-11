using Microsoft.EntityFrameworkCore;
using static Application.Commands.AddContact;

namespace Application.Tests.Commands.AddContact;
public class HandlerTests
{
    [Fact]
    public async Task Should_Save_Contact_And_Return_Id()
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
            "666-888-1444",
            "BG46STSA93008297336485"
            );

        var fakeContext = A.Fake<DbContext>();

        var handler = new Handler(fakeContext);

        // Act
        await handler.Handle(command, default);

        // Assert
        A.CallTo(() => fakeContext.SaveChangesAsync(default))
            .MustHaveHappenedOnceExactly();
    }
}
