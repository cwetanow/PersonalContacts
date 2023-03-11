using Domain.Common;

namespace Domain;

public class Address : ValueObject
{
    public Address(string street, string city, string? zipCode)
    {
        Street = street;
        City = city;
        ZipCode = zipCode;
    }

    public string Street { get; private set; }
    public string City { get; private set; }
    public string? ZipCode { get; private set; }

    protected override IEnumerable<object> GetAtomicValues()
    {
        yield return Street;
        yield return City;
    }
}