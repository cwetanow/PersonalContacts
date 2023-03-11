using Domain.Common;

namespace Domain;

public class PhoneNumber : ValueObject
{
    public PhoneNumber(string value)
    {
        Value = value;
    }

    public string Value { get; private set; }

    protected override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}