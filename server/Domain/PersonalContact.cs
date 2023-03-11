using Domain.Common;

namespace Domain;
public class PersonalContact : Entity
{
    private PersonalContact() { }

    public PersonalContact(string firstName, string lastName, DateOfBirth dateOfBirth, Address address, PhoneNumber phoneNumber, Iban iban)
    {
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Address = address;
        PhoneNumber = phoneNumber;
        Iban = iban;

        FullName = $"{FirstName} {LastName}";
    }

    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string FullName { get; private set; }
    public DateOfBirth DateOfBirth { get; private set; }
    public Address Address { get; private set; }
    public PhoneNumber PhoneNumber { get; private set; }
    public Iban Iban { get; private set; }
}
