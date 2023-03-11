namespace Application.Common.Contracts;
public interface IIBANValidator
{
    bool IsValid(string iban);
}
