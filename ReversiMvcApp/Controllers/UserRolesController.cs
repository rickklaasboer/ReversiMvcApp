using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReversiMvcApp.DatabaseContexts;
using ReversiMvcApp.Models;
using ReversiMvcApp.Requests;

namespace ReversiMvcApp.Controllers
{
    [Authorize(Roles = "Admin,Moderator")]
    public class UserRolesController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ReversiDbContext _context;

        public UserRolesController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager,
            ReversiDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            var users = await _userManager.Users.Where(x => x.Id != User.FindFirstValue(ClaimTypes.NameIdentifier))
                .ToListAsync();

            return View(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Manage(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null || user.Id == User.FindFirstValue(ClaimTypes.NameIdentifier)) return NotFound();

            return View(new ManageUserViewModel
            {
                User = user,
                UserRoles = await _userManager.GetRolesAsync(user)
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Manage([FromForm] ManageUserSaveRequest request, string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null || user.Id == User.FindFirstValue(ClaimTypes.NameIdentifier)) return NotFound();

            await _userManager.RemoveFromRolesAsync(user, new List<string> {"Admin", "Moderator", "Player"});

            foreach (var role in request.Roles)
            {
                // Cancel if the role doesn't exist or user already has specified role
                if (await _roleManager.RoleExistsAsync(role) &&
                    !(await _userManager.GetRolesAsync(user)).Contains(role))
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return RedirectToAction(nameof(Manage), user.Id);
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            // User cannot delete him/herself
            if (user == null || user.Id == User.FindFirstValue(ClaimTypes.NameIdentifier)) return NotFound();

            await _userManager.RemoveFromRolesAsync(user, new List<string> {"Admin", "Moderator", "Player"});

            var player = new Player
            {
                Guid = user.Id
            };
            
            _context.Players.Remove(player);
            
            await _context.SaveChangesAsync();
            
            await _userManager.DeleteAsync(user);

            return RedirectToAction(nameof(Index));
        }
    }
}