using Contracts.DtoModels;
using Contracts.Storages;
using DatabaseImplement.Models;

namespace DatabaseImplement.Storages
{
    public class MessageStorage : IMessageStorage
    {
        public async Task<MessageDTO> Create(MessageDTO message)
        {
            using Database db = new Database();

            Message newMessage = new Message(message, db);

            db.Messages.Add(newMessage);

            await db.SaveChangesAsync();
            return newMessage.GetModel();
        }
    }
}
