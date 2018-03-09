namespace Core.Abstractions
{
    public interface ICommandHandler<in TCommand>
    {
        void Handle(TCommand command);
    }
}
