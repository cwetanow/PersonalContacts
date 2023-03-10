namespace Domain.Common;

public abstract class Entity
{
    public Guid Id { get; private set; }
    public DateTime CreateDate { get; private set; }
}
