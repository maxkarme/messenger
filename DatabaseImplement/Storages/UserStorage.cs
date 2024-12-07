using Microsoft.EntityFrameworkCore;
using Contracts.BindingModels;
using Contracts.Storages;
using DatabaseImplement.Models;

namespace DatabaseImplement.Storages
{
    public class UserStorage : IUserStorage
    {
        public async Task CreateOrUpdateUser(UserInfoDTO user)
        {
            using Database db = new Database();

            var existUser = await db.Users.FirstOrDefaultAsync(x => x.Id == user.Id);

            if (existUser != null)
            {
                existUser.Update(user);
            }
            else
            {
                db.Users.Add(new User(user));
            }

            await db.SaveChangesAsync();
        }

        public async Task<UserInfoDTO?> GetById(int userId)
        {
            using Database db = new Database();

            return await db.Users
                .Where(x => x.Id == userId)
                .Select(x => x.GetModel())
                .FirstOrDefaultAsync();
        }

        public async Task<UserInfoDTO?> GetByLogin(string login)
        {
            using Database db = new Database();

            return await db.Users
                .Where(x => x.Login == login)
                .Select(x => x.GetModel())
                .FirstOrDefaultAsync();
        }
    }
}
