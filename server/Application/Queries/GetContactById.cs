using Application.Common.Exceptions;
using Application.Models;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries;
public class GetContactById
{
    public record Query(Guid Id) : IRequest<PersonalContactDetailsDto>;

    public class Handler : IRequestHandler<Query, PersonalContactDetailsDto>
    {
        private readonly DbContext context;
        private readonly IMapper mapper;

        public Handler(DbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<PersonalContactDetailsDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var contact = await context.Set<PersonalContact>()
                .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (contact is null)
            {
                throw new EntityNotFoundException<PersonalContact>(request.Id);
            }

            return mapper.Map<PersonalContactDetailsDto>(contact);
        }
    }
}
