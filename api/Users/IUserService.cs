namespace Api.Users;

public interface IUserService
{
    Task<IReadOnlyCollection<UserDto>> GetAsync();
    Task<UserDto> AddAsync(UserDto user);
    Task UpdateAsync(UserDto user);
}