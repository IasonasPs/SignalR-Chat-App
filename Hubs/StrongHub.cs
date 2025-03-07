using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class StrongHub : Hub<IChatClient>
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.ReceiveMessage(user, message);
        }

        public async Task SendMessageToSelf(string user, string message)
        {
            await Clients.Caller.ReceiveMessage(user, message);
        }   

        public async Task SendMessageToGroup(string user, string message, string groupName)
        {
            await Clients.Group(groupName).ReceiveMessage(user, message);
        }
    }
}
