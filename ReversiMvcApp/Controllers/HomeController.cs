using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReversiMvcApp.DatabaseContexts;
using ReversiMvcApp.Models;
using ReversiMvcApp.Services;
using ReversiMvcApp.Utility;

namespace ReversiMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly ReversiDbContext _context;

        private readonly ApiService _api;

        public HomeController(ILogger<HomeController> logger, ReversiDbContext dbContext, ApiService api)
        {
            _logger = logger;
            _context = dbContext;
            _api = api;
        }

        public async Task<IActionResult> Index()
        {
            SyncUser();
            
            ViewData["games"] = await _api.GetAvailableGames();
            return View();
        }

        [Authorize]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }

        /// <summary>
        /// Sync authenticated user to player table if it doesn't exist yet
        /// </summary>
        private void SyncUser()
        {
            try
            {
                var userGuid = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var player = _context.Players.FirstOrDefault(p => p.Guid == userGuid);

                if (player == null)
                {
                    Tap.Capture(_context, db =>
                    {
                        db.Players.Add(new Player
                        {
                            Guid = userGuid,
                            Name = User.Identity?.Name
                        });
                    }).SaveChanges();
                }
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.ToString());
            }
        }
    }
}