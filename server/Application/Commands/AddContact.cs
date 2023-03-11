using Application.Common.Contracts;
using Application.Models;
using Domain;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands;
public class AddContact
{
    public record Command(string FirstName, string LastName, DateTime DateOfBirth, AddressDto Address, string PhoneNumber, string Iban) : IRequest<Guid>;

    public class Handler : IRequestHandler<Command, Guid>
    {
        private readonly DbContext context;

        public Handler(DbContext context)
        {
            this.context = context;
        }

        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            var address = new Address(request.Address.Street, request.Address.City, request.Address.ZipCode);
            var dateOfBirth = DateOfBirth.Create(request.DateOfBirth);

            var contact = new PersonalContact(request.FirstName, request.LastName, dateOfBirth, address, new PhoneNumber(request.PhoneNumber), new Iban(request.Iban));

            context.Add(contact);
            await context.SaveChangesAsync(cancellationToken);

            return contact.Id;
        }
    }

    public class Validator : AbstractValidator<Command>
    {
        private readonly IIBANValidator ibanValidator;

        public Validator(IIBANValidator ibanValidator)
        {
            this.ibanValidator = ibanValidator;

            RuleFor(c => c.FirstName).NotNull().NotEmpty();
            RuleFor(c => c.LastName).NotNull().NotEmpty();

            RuleFor(c => c.DateOfBirth).NotEqual(default(DateTime));

            RuleFor(c => c.Address)
                .NotNull()
                .ChildRules(v =>
                {
                    v.RuleFor(a => a.City).NotNull().NotEmpty();
                    v.RuleFor(a => a.Street).NotNull().NotEmpty();
                });

            RuleFor(c => c.PhoneNumber)
                .Custom(PhoneNumberValidator);

            RuleFor(c => c.Iban)
                .Custom(ValidateIban);
        }

        private void PhoneNumberValidator(string value, ValidationContext<Command> context)
        {
            // Dummy phone number validator
            if (value.Length < 3)
            {
                context.AddFailure(new ValidationFailure(nameof(Command.PhoneNumber), "Invalid phone number", value));
            }
        }

        private void ValidateIban(string value, ValidationContext<Command> context)
        {
            // Dummy IBAN validator
            if (!ibanValidator.IsValid(value))
            {
                context.AddFailure(new ValidationFailure(nameof(Command.Iban), "Invalid IBAN", value));
            }
        }
    }
}
