using Api.Users;

namespace Api.Messages;

public interface IMessageService
{
    Task<IReadOnlyCollection<MessageDto>> GetAsync();
    Task<MessageDto> AddAsync(MessageDto message);
    Task<IReadOnlyCollection<MessageDto>> GetForUserAsync(string userName);
}