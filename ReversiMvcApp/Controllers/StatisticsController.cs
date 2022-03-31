using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReversiMvcApp.Services;

namespace ReversiMvcApp.Controllers
{
    public class StatisticRow
    {
        public string Token { get; set; }
        public IdentityUser Player1 { get; set; }
        public IdentityUser Player2 { get; set; }
        public IdentityUser WinningPlayer { get; set; }
    }

    [Authorize]
    public class StatisticsController : Controller
    {
        private readonly ApiService _api;

        private readonly UserManager<IdentityUser> _userManager;

        public StatisticsController(ApiService api, UserManager<IdentityUser> userManager)
        {
            _api = api;
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var results = await _api.GetStatistics();
            var response = await Task.WhenAll(results.Select(async s => new StatisticRow()
            {
                Token = s.Token,
                Player1 = await _userManager.FindByIdAsync(s.Player1Token),
                Player2 = await _userManager.FindByIdAsync(s.Player2Token),
                WinningPlayer = await _userManager.FindByIdAsync(s.WinningPlayer)
            }).ToList());

            ViewBag.Users = _userManager.Users.ToList();

            return View(response.ToList());
        }
    }
}