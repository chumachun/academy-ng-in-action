using Api.Cosmos;

using Microsoft.Azure.Cosmos.Linq;

namespace Api.Users;

public class UserService(ICosmosService service) : IUserService
{
    public async Task<IReadOnlyCollection<UserDto>> GetAsync()
    {
        using var iterator = service.Users
            .GetItemLinqQueryable<UserDto>()
            .ToFeedIterator();

        return (await iterator.ReadNextAsync())
            .ToList();
    }

    public async Task<UserDto> AddAsync(UserDto user)
    {
        var userFromCosmos = await GetUserAsync(service, user);

        return userFromCosmos != null
            ? throw new InvalidOperationException($"User '{user.Name}' already exists. Id: {user.Id}")
            : (await service.Users.CreateItemAsync(user)).Resource;
    }

    public async Task UpdateAsync(UserDto user)
    {
        _ = await GetUserAsync(service, user)
            ?? throw new InvalidOperationException($"User '{user.Name}' does not exist.");

        _ = await service.Users.UpsertItemAsync(user);
    }

    private static async Task<UserDto?> GetUserAsync(ICosmosService service, UserDto user)
    {
        using var iterator = service.Users
            .GetItemLinqQueryable<UserDto>()
            .Where(u => u.Name == user.Name)
            .ToFeedIterator();

        return iterator.HasMoreResults
            ? (await iterator.ReadNextAsync()).FirstOrDefault()
            : null;
    }
}