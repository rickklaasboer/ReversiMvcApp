using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using ReversiMvcApp.DTO;
using ReversiMvcApp.Hubs;
using ReversiMvcApp.Services;

namespace ReversiMvcApp.Controllers
{
    [Authorize]
    public class GameController : Controller
    {
        private readonly ApiService _api;

        private readonly IHubContext<HomeHub> _homeHubContext;

        public GameController(ApiService api, IHubContext<HomeHub> homeHubContext)
        {
            _api = api;
            _homeHubContext = homeHubContext;
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Description")] Game game)
        {
            var response = await _api.CreateGame(JsonConvert.SerializeObject(new
            {
                game.Description,
                Player1Token = User.FindFirstValue(ClaimTypes.NameIdentifier)
            }));

            await _homeHubContext.Clients.All.SendAsync(
                "GAME_CREATED",
                JsonConvert.SerializeObject(response)
            );

            return Redirect($"/game/details/{response.Token}");
        }

        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            ViewData["game"] = await _api.GetGameByToken(id);
            ViewData["PlayerToken"] = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return View();
        }
    }
}