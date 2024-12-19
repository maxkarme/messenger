using Contracts.DtoModels;
using Messenger.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using System.Security.Claims;

namespace Messenger.Controllers
{
    [ApiController]
    [Route("/message")]
    public class MessageController : ControllerBase
    {
		private int UserId => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        private MessageService messageService;
        private MessageQueueService messageQueueService;

        public MessageController(MessageService messageService, MessageQueueService messageQueueService)
        {
            this.messageService = messageService;
            this.messageQueueService = messageQueueService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task Create([FromBody] MessageDTO message)
        {
            var createdMesssage = await messageService.Create(message, UserId);
            messageQueueService.Publish(createdMesssage);
        }

        [Authorize]
        [HttpGet("subscribe")]
        public async Task<MessageDTO?> Subscribe(int chatId)
        {
            var res = await messageQueueService.Subscribe(chatId);
            return res;
        }
    }
}
