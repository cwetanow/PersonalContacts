using Application.Common.Exceptions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands;
public class RemoveContact
{
    public record Command(Guid Id) : IRequest;

    public class Handler : IRequestHandler<Command>
    {
        private readonly DbContext context;

        public Handler(DbContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var contact = await context.Set<PersonalContact>()
                .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (contact is null)
            {
                throw new EntityNotFoundException<PersonalContact>(request.Id);
            }

            context.Remove(contact);
            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
