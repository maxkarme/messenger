using Contracts.BindingModels;
using Models.DatabaseModels;

namespace Contracts.DtoModels
{
    public class ChatDTO : IChatModel
    {
        public int? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<UserInfoDTO> Users { get; set; } = new();
        public List<MessageDTO> Messages { get; set; } = new();
    }
}
