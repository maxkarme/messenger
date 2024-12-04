using Contracts.BindingModels;
using Contracts.DtoModels;
using Contracts.Storages;
using DatabaseImplement.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Messenger.Services
{
    public class UserService
    {
        private IUserStorage userStorage;
        private AuthOptions authOptions;

        public UserService(IUserStorage userStorage, IOptions<AuthOptions> authOptions)
        {
            this.userStorage = userStorage;
            this.authOptions = authOptions.Value;
        }

        public async Task<string?> CheckAuth(UserLoginDTO userLoginDTO)
        {
            UserInfoDTO user = await userStorage.GetByLogin(userLoginDTO.Login);

            if (user == null || user.Password != userLoginDTO.Password)
            {
                return null;
            }

            return GenerateToken(user);
        }

        public async Task<string?> Registrate(UserInfoDTO userInfoDTO)
        {
            var user = await userStorage.GetByLogin(userInfoDTO.Login);

            if (user != null) return null;

            await userStorage.CreateOrUpdateUser(userInfoDTO);

            return GenerateToken(userInfoDTO);
        }

        private string GenerateToken(UserInfoDTO user)
        {
            var securityKey = authOptions.GetSymmetricSecurityKey();
            var credentails = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Email, user.Login),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };
            var token = new JwtSecurityToken(
                    authOptions.Issuer,
                    authOptions.Audience,
                    Claims,
                    expires: DateTime.Now.AddSeconds(authOptions.TokenLifeTime),
                    signingCredentials: credentails
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
