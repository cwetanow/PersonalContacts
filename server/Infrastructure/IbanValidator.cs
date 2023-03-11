using Application.Common.Contracts;
using IbanNet;

namespace Infrastructure;
public class IbanValidator : IIBANValidator
{
    private readonly IIbanValidator validator;

    public IbanValidator(IIbanValidator validator)
    {
        this.validator = validator;
    }

    public bool IsValid(string iban) => validator.Validate(iban).IsValid;
}
