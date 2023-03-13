using Application.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries;
public class GetPersonalContacts
{
    public record Query(string? NameSearchTerm = null) : IRequest<IEnumerable<PersonalContactSimpleDto>>;

    public class Handler : IRequestHandler<Query, IEnumerable<PersonalContactSimpleDto>>
    {
        private readonly IMapper mapper;
        private readonly DbContext context;

        public Handler(IMapper mapper, DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<PersonalContactSimpleDto>> Handle(Query request, CancellationToken cancellationToken) => await context.Set<PersonalContact>()
                    .Where(c => string.IsNullOrEmpty(request.NameSearchTerm) || c.FullName.ToLower().Contains(request.NameSearchTerm.ToLower()))
                    .ProjectTo<PersonalContactSimpleDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
    }
}
