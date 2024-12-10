using Contracts.DtoModels;

namespace Contracts.Storages
{
    public interface IChatStorage
    {
        Task<ChatDTO> Create(ChatDTO chat);
        Task AddUsers(int chatId, List<int> users);

        Task<List<ChatDTO>> GetUserChats(int userId);
    }
}
