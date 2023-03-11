using Domain.Common;

namespace Domain;

public class Iban : ValueObject
{
    public Iban(string value)
    {
        Value = value;
    }

    public string Value { get; private set; }

    protected override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}