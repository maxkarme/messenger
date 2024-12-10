using Contracts.DtoModels;

namespace Contracts.Storages
{
    public interface IMessageStorage
    {
        Task<MessageDTO> Create(MessageDTO message);
    }
}
