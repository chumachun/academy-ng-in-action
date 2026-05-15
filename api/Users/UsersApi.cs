namespace Api.Users;

public static class UsersApi
{
    public static void MapUsersApi(this RouteGroupBuilder group, IUserService service)
    {
        _ = group.MapGet("/", service.GetAsync);
        _ = group.MapPost("/", service.AddAsync);
        _ = group.MapPut("/", service.UpdateAsync);
    }
}