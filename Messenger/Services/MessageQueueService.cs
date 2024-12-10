using Contracts.DtoModels;
using System.Collections.Concurrent;

namespace Messenger.Services
{
    class MessageQueueValue
    {
        public MessageDTO? result;
        public CancellationTokenSource cancellationTokenSource;

        public MessageQueueValue(MessageDTO? result, CancellationTokenSource cancellationTokenSource)
        {
            this.result = result;
            this.cancellationTokenSource = cancellationTokenSource;
        }
    }

    public class MessageQueueService
    {
        private ConcurrentDictionary<int, List<MessageQueueValue>> queue = new();

        public async Task<MessageDTO?> Subscribe(int chatId)
        {
            CancellationTokenSource source = new CancellationTokenSource();
            MessageQueueValue value = new MessageQueueValue(null, source);

            if (!queue.ContainsKey(chatId))
            {
                queue.TryAdd(chatId, new List<MessageQueueValue>());
            }

            queue[chatId].Add(value);

            try
            {
                await Task.Delay(10 * 1000, cancellationToken: source.Token);
            }
            catch (TaskCanceledException ex)
            {
            }

            return value.result;
        }

        public void Publish(MessageDTO message)
        {
            if (!queue.ContainsKey(message.ChatId)) return;

            foreach(var value in queue[message.ChatId])
            {
                value.cancellationTokenSource.Cancel();
                value.result = message;
            }

            queue[message.ChatId].Clear();
        }
    }
}
