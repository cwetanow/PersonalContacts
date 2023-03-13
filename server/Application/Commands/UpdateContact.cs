using Application.Common.Contracts;
using Application.Common.Exceptions;
using Application.Models;
using AutoMapper;
using Domain;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands;
public class UpdateContact
{
    public record Command(Guid Id, string FirstName, string LastName, DateTime DateOfBirth, AddressDto Address, string PhoneNumber, string Iban)
        : IRequest<PersonalContactDetailsDto>;

    public class Handler : IRequestHandler<Command, PersonalContactDetailsDto>
    {
        private readonly DbContext context;
        private readonly IMapper mapper;

        public Handler(DbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<PersonalContactDetailsDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var contact = await context.Set<PersonalContact>()
                .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (contact is null)
            {
                throw new EntityNotFoundException<PersonalContact>(request.Id);
            }

            contact.Rename(request.FirstName, request.LastName);

            var address = new Address(request.Address.Street, request.Address.City, request.Address.ZipCode);
            var dateOfBirth = DateOfBirth.Create(request.DateOfBirth);

            context.Add(contact);
            await context.SaveChangesAsync(cancellationToken);

            return mapper.Map<PersonalContactDetailsDto>(contact);
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
