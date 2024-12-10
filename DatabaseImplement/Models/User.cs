using Contracts.BindingModels;
using Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [ForeignKey("UserId")]
        public virtual List<UserChat> Chats { get; set; } = new();

        public User() { }

        public User(UserInfoDTO user, Database context)
        {
            Name = user.Name;
            Login = user.Login;
            Password = user.Password;
            Chats = user.Chats.Select(x =>
                new UserChat
                {
                    Chat = context.Chats.First(y => y.Id == x.Id)
                }
            ).ToList();
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
