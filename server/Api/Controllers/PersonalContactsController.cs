using Application.Commands;
using Application.Models;
using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class PersonalContactsController : ControllerBase
{
    private readonly IMediator mediator;

    public PersonalContactsController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IEnumerable<PersonalContactSimpleDto>> GetContacts(string? nameSearchTerm, CancellationToken cancellationToken)
        => await mediator.Send(new GetPersonalContacts.Query(nameSearchTerm), cancellationToken);

    [HttpGet("{id}")]
    public async Task<PersonalContactDetailsDto> GetContact(Guid id, CancellationToken cancellationToken)
        => await mediator.Send(new GetContactById.Query(id), cancellationToken);

    [HttpPost]
    public async Task<Guid> AddContact(AddContact.Command request, CancellationToken cancellationToken)
        => await mediator.Send(request, cancellationToken);

    [HttpDelete("{id}")]
    public async Task RemoveContact(Guid id, CancellationToken cancellationToken)
        => await mediator.Send(new RemoveContact.Command(id), cancellationToken);
}
