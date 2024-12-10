using Contracts.DtoModels;
using Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DatabaseImplement.Models
{
    public class Chat : IChatModel
    {
        public int Id { get; set; }


        [Required]
        public string Name { get; set; } = string.Empty;

        [ForeignKey("ChatId")]
        public virtual List<UserChat> Users { get; set; } = new();

        [ForeignKey("ChatId")]
        public virtual List<Message> Messages { get; set; } = new();
        

        public Chat() { }

        public Chat(ChatDTO chatDTO, Database context)
        {
            Name = chatDTO.Name;
            Users = chatDTO.Users.Select(x =>
                new UserChat
                {
                    User = context.Users.First(y => y.Id == x.Id),
                }
            ).ToList();
            Messages = chatDTO.Messages.Select(x => new Message(x, context)).ToList();
        }

        public ChatDTO GetModel()
        {
            return new ChatDTO
            {
                Id = Id,
                Name = Name,
                Messages = Messages.Select(x => x.GetModel()).ToList()
            };
        }
    }
}
