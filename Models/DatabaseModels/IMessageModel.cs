namespace Models.DatabaseModels
{
    public interface IMessageModel
    {
        string Text { get; }
        DateTime Date { get; }
    }
}
