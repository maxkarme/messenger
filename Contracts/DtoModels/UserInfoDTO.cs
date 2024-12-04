using Models.DatabaseModels;

namespace Contracts.BindingModels
{
    public class UserInfoDTO : IUserModel
    {
        public int? Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Login { get; set; } = string.Empty;

        public string Password {  get; set; } = string.Empty;
    }
}
