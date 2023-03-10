using Application.Common.Contracts;

namespace Api.Services;

// This is a mock current user to have some data when no user management is implemented
public class FakeCurrentUser : ICurrentUser
{
    public string UserId => "67304a9e-14b3-4cc7-9949-3dc6db4f8d8d";
}
