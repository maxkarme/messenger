using Contracts.DtoModels;
using Contracts.Storages;
using DatabaseImplement.Models;
using Microsoft.EntityFrameworkCore;

namespace DatabaseImplement.Storages
{
    public class ChatStorage : IChatStorage
    {
        public async Task AddUsers(int chatId, List<int> users)
        {
            using Database db = new Database();

            var chat = await db.Chats
                .Include(x => x.Users)
                .ThenInclude(x => x.User)
                .FirstAsync(x => x.Id == chatId);

            List<UserChat> usersList = users.Select(x =>
                new UserChat
                {
                    UserId = x,
                    User = db.Users.First(y => y.Id == x)
                }
            ).ToList();

            chat.Users.AddRange(usersList);

            await db.SaveChangesAsync();
        }

        public async Task<ChatDTO> Create(ChatDTO chat)
        {
            using Database db = new Database();

            var newChat = new Chat(chat, db);

            db.Chats.Add(newChat);

            await db.SaveChangesAsync();
            return newChat.GetModel();
        }

        public async Task<List<ChatDTO>> GetUserChats(int userId)
        {
            using Database db = new Database();

            return await db.Chats
                .Include(x => x.Users)
                .ThenInclude(x => x.User)
                .Include(x => x.Messages)
                .ThenInclude(x => x.User)
                .Where(x => x.Users.Select(y => y.UserId).Contains(userId))
                .Select(x => x.GetModel())
                .ToListAsync();
        }

        public async Task<List<MessageDTO>> SearchMessageByUser(int userId, int chatId, string text, int page, int size)
        {
            using Database db = new Database();

            var chat = await db.Chats
                .Include(x => x.Messages)
                .ThenInclude(x => x.User)
                .Include(x => x.Users)
                .FirstOrDefaultAsync(x =>
                    x.Id == chatId && x.Users.Select(y => y.UserId).Contains(userId)
                );

            if (chat == null) return [];

            return chat.Messages
                .Where(x => x.Text.Contains(text))
                .Select(x => x.GetModel())
                .Skip(page * size)
                .Take(size)
                .ToList();
        }
    }
}
