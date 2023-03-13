using Api.Requests;
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

    public PersonalContactsController(IMediator mediator) => this.mediator = mediator;

    [HttpGet]
    public async Task<IEnumerable<PersonalContactSimpleDto>> GetContacts(string? nameSearchTerm, CancellationToken cancellationToken)
        => await mediator.Send(new GetPersonalContacts.Query(nameSearchTerm), cancellationToken);

    [HttpGet("{id}")]
    public async Task<PersonalContactDetailsDto> GetContact(Guid id, CancellationToken cancellationToken)
        => await mediator.Send(new GetContactById.Query(id), cancellationToken);

    [HttpPost]
    public async Task<PersonalContactDetailsDto> AddContact(AddContact.Command request, CancellationToken cancellationToken)
        => await mediator.Send(request, cancellationToken);

    [HttpDelete("{id}")]
    public async Task RemoveContact(Guid id, CancellationToken cancellationToken)
        => await mediator.Send(new RemoveContact.Command(id), cancellationToken);

    [HttpPut("{id}/Rename")]
    public async Task<PersonalContactSimpleDto> RenameContact(Guid id, RenameContactRequest request, CancellationToken cancellationToken)
        => await mediator.Send(new RenameContact.Command(id, request.FirstName, request.LastName), cancellationToken);

    [HttpPut("{id}/Details")]
    public async Task<PersonalContactDetailsDto> ChangeDetails(Guid id, ChangeContactDetailsRequest request, CancellationToken cancellationToken)
        => await mediator.Send(new ChangeContactDetails.Command(id, request.DateOfBirth, request.Address, request.PhoneNumber, request.Iban), cancellationToken);
}
