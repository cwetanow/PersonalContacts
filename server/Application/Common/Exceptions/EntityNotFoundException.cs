namespace Application.Common.Exceptions;
public class EntityNotFoundException : Exception
{
    public EntityNotFoundException(Guid id, Type entityType)
        : this(id.ToString(), entityType)
    { }

    public EntityNotFoundException(string id, Type entityType)
        : base($"Entity of type {entityType.Name} with id {id} is not found")
    { }
}
