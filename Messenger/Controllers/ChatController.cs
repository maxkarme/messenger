using Contracts.DtoModels;
using Messenger.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Messenger.Controllers
{
	[ApiController]
	[Route("/chat")]
    public class ChatController : ControllerBase
    {
		private int UserId => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        private ChatService chatService;

        public ChatController(ChatService chatService)
        {
            this.chatService = chatService;
        }


        [Authorize]
        [HttpGet("get-user-chats")]
        public async Task<List<ChatDTO>> getUserChats()
        {
            return await chatService.GetUserChats(UserId);
        }

        [Authorize]
        [HttpPost("create-chat")]
        public async Task<ChatDTO> createChat([FromBody] ChatDTO chat)
        {
            return await chatService.CreateChat(chat);
        }

        [Authorize]
        [HttpPost("add-users")]
        public async Task addUsers(int chatId, [FromBody] List<int> users)
        {
            await chatService.AddUsers(chatId, users); 
        }

        [Authorize]
        [HttpGet("search-messages")]
        public async Task<List<MessageDTO>> SearchMessages(int chatId, string text, int page, int size)
        {
            return await chatService.SearchMesasgesByUser(UserId, chatId, text, page, size);
        }
    }
}
