using Contracts.DtoModels;
using Contracts.Storages;

namespace Messenger.Services
{
    public class ChatService
    {
        private IChatStorage chatStorage;

        public ChatService(IChatStorage storage)
        {
            this.chatStorage = storage;
        }

        public async Task<ChatDTO> CreateChat(ChatDTO chat)
        {
            return await chatStorage.Create(chat);
        }

        public async Task AddUsers(int chatId, List<int> users)
        {
            await chatStorage.AddUsers(chatId, users);
        }

        public async Task<List<ChatDTO>> GetUserChats(int userId)
        {
            return await chatStorage.GetUserChats(userId);
        }

        public async Task<List<MessageDTO>> SearchMesasgesByUser(int userId, int chatId, string text, int page, int size)
        {
            return await chatStorage.SearchMessageByUser(userId, chatId, text, page, size);
        }
    }
}
