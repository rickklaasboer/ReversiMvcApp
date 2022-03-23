using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReversiMvcApp.DTO;
using ReversiMvcApp.Services;

namespace ReversiMvcApp.Controllers
{
    [Authorize]
    public class GameController : Controller
    {
        private readonly ApiService _api;

        public GameController(ApiService api)
        {
            _api = api;
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

            return Redirect($"/game/details/{response.Token}");
        }

        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            ViewData["game"] = await _api.GetGameByToken(id);
            return View();
        }
    }
}