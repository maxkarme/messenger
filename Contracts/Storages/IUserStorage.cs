using Contracts.BindingModels;
using Models.DatabaseModels;

namespace Contracts.Storages
{
    public interface IUserStorage
    {
        Task<UserInfoDTO?> GetByLogin(string login);
        Task CreateOrUpdateUser(UserInfoDTO user);
    }
}
