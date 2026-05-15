using Api.Messages;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(MessageDto message) => await Clients.All.SendAsync("messageReceived", message);
}