using System;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using ReversiMvcApp.Services;

namespace ReversiMvcApp.Hubs
{
    public class GameHub : Hub
    {
        private readonly ApiService _api;

        public GameHub(ApiService api)
        {
            _api = api;
        }

        public async Task Init(string token)
        {
            await Clients.Caller.SendAsync("GAME_INIT", JsonConvert.SerializeObject(await _api.GetGameByToken(token)));
        }

        public async Task JoinRoom(string token)
        {
            var response = await _api.JoinGame(token, GetUserUuid());

            if (response.Token == null)
            {
                throw new Exception("Invalid join request");
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, token);
            await Clients.Group(token)
                .SendAsync("PLAYER_JOINED", JsonConvert.SerializeObject(response));
        }

        public async Task LeaveRoom(string token)
        {
            var response = await _api.LeaveGame(token, GetUserUuid());

            if (response.Token == null)
            {
                throw new Exception("Invalid leave request");
            }

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, token);
            await Clients.Group(token)
                .SendAsync("PLAYER_LEFT", JsonConvert.SerializeObject(response));
        }

        public async Task AbandonTurn(string token)
        {
            var response = await _api.AbandonTurn(JsonConvert.SerializeObject(new
            {
                GameToken = token,
                PlayerToken = GetUserUuid()
            }));

            if (response.Board == null)
            {
                await Clients.Caller.SendAsync("INVALID_SKIP_REQUEST");
                return;
            }

            if (response.IsFinished)
            {
                await Clients.Group(token).SendAsync("GAME_FINISHED", JsonConvert.SerializeObject(response));
            }

            await Clients.Group(token).SendAsync("PLAYER_ABANDONED_TURN", JsonConvert.SerializeObject(response));
        }

        public async Task PlaceFiche(string token, int x, int y, int color)
        {
            var response = await _api.DoTurn(JsonConvert.SerializeObject(new
            {
                GameToken = token,
                Row = y,
                Column = x,
                PlayerToken = GetUserUuid(),
            }));

            if (response.Board == null)
            {
                await Clients.Caller.SendAsync("INVALID_FICHE_PLACEMENT");
                return;
            }

            if (response.IsFinished)
            {
                await Clients.Group(token).SendAsync("GAME_FINISHED", JsonConvert.SerializeObject(response));
            }

            await Clients.Group(token).SendAsync("FICHE_PLACED", JsonConvert.SerializeObject(response));
        }

        private string GetUserUuid()
        {
            return Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}