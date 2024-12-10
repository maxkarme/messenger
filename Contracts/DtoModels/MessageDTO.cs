using Contracts.BindingModels;
using Models.DatabaseModels;

namespace Contracts.DtoModels
{
    public class MessageDTO : IMessageModel
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public UserInfoDTO? UserInfo { get; set; }
        public int ChatId { get; set; }
    }
}