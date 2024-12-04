namespace Models.DatabaseModels
{
    public interface IUserModel
    {
        string Name { get; }
        string Login {  get; }
        string Password { get; }
    }
}
