using Contracts.BindingModels;
using Contracts.DtoModels;
using Models.DatabaseModels;

namespace Contracts.Storages
{
    public interface IUserStorage
    {
        Task<UserInfoDTO?> GetByLogin(string login);
        Task CreateOrUpdateUser(UserInfoDTO user);
        Task<UserInfoDTO?> GetById(int userId);
        Task<List<UserInfoDTO>> GetByFilter(UserSearchDTO filter, int page, int size);
    }
}
