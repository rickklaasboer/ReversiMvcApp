using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ReversiMvcApp.DTO;

namespace ReversiMvcApp.Services
{
    public class ApiService
    {
        private readonly HttpClient _client;

        public ApiService(string uri)
        {
            _client = new HttpClient(new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = (_, _, _, _) => true
            });
            _client.BaseAddress = new Uri(uri);
        }

        /// <summary>
        /// Get all games waiting for player(s)
        /// </summary>
        public async Task<List<Game>> GetAvailableGames()
        {
            var response = await _client.GetAsync("game");

            return JsonConvert.DeserializeObject<List<Game>>(
                await response.Content.ReadAsStringAsync()
            );
        }

        public async Task<Game> GetGameByToken(string token)
        {
            var response = await _client.GetAsync($"game/{token}");

            return JsonConvert.DeserializeObject<Game>(
                await response.Content.ReadAsStringAsync()
            );
        }

        public async Task<Game> DoTurn(string body)
        {
            var content = new StringContent(body, Encoding.UTF8, "application/json");
            var response = await _client.PutAsync($"game/turn", content);

            return JsonConvert.DeserializeObject<Game>(
                await response.Content.ReadAsStringAsync()
            );
        }

        public async Task<Game> AbandonTurn(string body)
        {
            var content = new StringContent(body, Encoding.UTF8, "application/json");
            var response = await _client.PutAsync($"game/turn/abandon", content);

            return JsonConvert.DeserializeObject<Game>(
                await response.Content.ReadAsStringAsync()
            );
        }

        /// <summary>
        /// Create a new game
        /// </summary>
        /// <param name="body"></param>
        /// <returns></returns>
        public async Task<Game> CreateGame(string body)
        {
            var content = new StringContent(body, Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("game", content);

            return JsonConvert.DeserializeObject<Game>(
                await response.Content.ReadAsStringAsync()
            );
        }
    }
}