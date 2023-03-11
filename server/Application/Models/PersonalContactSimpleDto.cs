﻿using Application.Common.Mapping;
using Domain;

namespace Application.Models;
public class PersonalContactSimpleDto : IMapFrom<PersonalContact>
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName { get; set; }
}
