using Application.Commands;
using AutoMapper;
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

    [HttpPost]
    public async Task<Guid> AddContact(AddContact.Command request, CancellationToken cancellationToken)
        => await mediator.Send(request, cancellationToken);
}
