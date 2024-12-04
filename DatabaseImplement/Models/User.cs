using Contracts.BindingModels;
using Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;

namespace DatabaseImplement.Models
{
    public class User : IUserModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Login { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public User() { }

        public User(UserInfoDTO user)
        {
            Name = user.Name;
            Login = user.Login;
            Password = user.Password;
        }

        public void Update(UserInfoDTO user)
        {
            Name = user.Name;
            Login = user.Login;
            Password = user.Password;
        }

        public UserInfoDTO GetModel()
        {
            return new UserInfoDTO
            {
                Id = Id,
                Name = Name,
                Login = Login,
                Password = Password
            };
        }
    }
}
