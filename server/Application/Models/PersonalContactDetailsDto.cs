using Application.Common.Mapping;
using AutoMapper;
using Domain;

namespace Application.Models;
public class PersonalContactDetailsDto : IMapFrom<PersonalContact>
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public AddressDto Address { get; set; }
    public string PhoneNumber { get; set; }
    public string Iban { get; set; }

    public void Mapping(Profile profile) => profile.CreateMap<PersonalContact, PersonalContactDetailsDto>()
            .ForMember(dest => dest.PhoneNumber, opts => opts.MapFrom(src => src.PhoneNumber.Value))
            .ForMember(dest => dest.Iban, opts => opts.MapFrom(src => src.Iban.Value))
            .ForMember(dest => dest.DateOfBirth, opts => opts.MapFrom(src => new DateTime(src.DateOfBirth.Year, src.DateOfBirth.Month, src.DateOfBirth.Day)));
}
