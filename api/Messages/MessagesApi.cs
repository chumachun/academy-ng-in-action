namespace Api.Messages;

public static class MessagesApi
{
    public static void MapMessagesApi(this RouteGroupBuilder group, IMessageService service)
    {
        _ = group.MapGet("/", service.GetAsync);
        _ = group.MapPost("/", service.AddAsync);
        
        _ = group.MapGet("/user/{userName}", service.GetForUserAsync);
    }
}