using Application.Common.Mapping;
using AutoMapper;
using Domain;

namespace Application.Models;
public class PersonalContactSimpleDto : IMapFrom<PersonalContact>
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName { get; set; }
    public string Address { get; set; }

    public void Mapping(Profile profile) => profile.CreateMap<PersonalContact, PersonalContactSimpleDto>()
            .ForMember(dest => dest.Address, opts => opts.MapFrom(src => $"{src.Address.Street}, {src.Address.City}"));
}
