using Contracts.DtoModels;
using Contracts.Storages;

namespace Messenger.Services
{
    public class MessageService
    {
        private UserService userService;
        private IMessageStorage messageStorage;

        public MessageService(IMessageStorage messageStorage, UserService userService)
        {
            this.messageStorage = messageStorage;
            this.userService = userService;
        }

        public async Task<MessageDTO> Create(MessageDTO message, int userId)
        {
            var user = await userService.GetUserById(userId);
            message.UserInfo = user;
            return await messageStorage.Create(message);
        }
    }
}
