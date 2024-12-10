using Contracts.DtoModels;
using Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DatabaseImplement.Models
{
    public class Message : IMessageModel
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual Chat Chat { get; set; }

        public Message() { }

        public Message(MessageDTO message, Database context)
        {
            Text = message.Text;
            Date = message.Date;
            User = context.Users.First(x => x.Id == message.UserInfo.Id);
            Chat = context.Chats.First(x => x.Id == message.ChatId);
        }

        public MessageDTO GetModel()
        {
            return new MessageDTO
            {
                Id = Id,
                Text = Text,
                Date = Date,
                UserInfo = User.GetModel(),
                ChatId = Chat.Id,
            };
        }
    }
}
