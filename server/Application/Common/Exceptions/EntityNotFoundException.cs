namespace Application.Common.Exceptions;
public class EntityNotFoundException<TEntity> : Exception
{
    public EntityNotFoundException(Guid id)
        : this(id.ToString())
    { }

    public EntityNotFoundException(string id)
        : base($"Entity of type {typeof(TEntity).Name} with id {id} is not found")
    { }
}
