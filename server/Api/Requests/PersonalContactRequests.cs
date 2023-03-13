using Application.Models;

namespace Api.Requests;

public record RenameContactRequest(string FirstName, string LastName);

public record ChangeContactDetailsRequest(DateTime DateOfBirth, AddressDto Address, string PhoneNumber, string Iban);