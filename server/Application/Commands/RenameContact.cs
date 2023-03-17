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
public class RenameContact
{
    public record Command(Guid Id, string FirstName, string LastName) : IRequest<PersonalContactSimpleDto>;

    public class Handler : IRequestHandler<Command, PersonalContactSimpleDto>
    {
        private readonly DbContext context;
        private readonly IMapper mapper;

        public Handler(DbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<PersonalContactSimpleDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var contact = await context.Set<PersonalContact>()
                .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (contact is null)
            {
                throw new EntityNotFoundException(request.Id, typeof(PersonalContact));
            }

            contact.Rename(request.FirstName, request.LastName);

            await context.SaveChangesAsync(cancellationToken);

            return mapper.Map<PersonalContactSimpleDto>(contact);
        }
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(c => c.FirstName).NotNull().NotEmpty();
            RuleFor(c => c.LastName).NotNull().NotEmpty();
        }
    }
}
