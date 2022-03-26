using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using ReversiMvcApp.Services;

namespace ReversiMvcApp.Hubs
{
    public class HomeHub : Hub
    {
        private readonly ApiService _api;

        public HomeHub(ApiService api)
        {
            _api = api;
        }

        public async Task Init()
        {
            await Clients.Caller.SendAsync("INIT_RECEIVED", new
            {
                games = JsonConvert.SerializeObject(await _api.GetAvailableGames()),
            });
        }
        
        
    }
}