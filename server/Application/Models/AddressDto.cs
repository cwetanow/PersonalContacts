using Application.Common.Mapping;
using Domain;

namespace Application.Models;
public class AddressDto : IMapFrom<Address>
{
    public string Street { get; set; }
    public string City { get; set; }
    public string? ZipCode { get; set; }
}
