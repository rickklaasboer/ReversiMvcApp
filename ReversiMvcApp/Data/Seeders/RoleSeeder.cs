using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ReversiMvcApp.Data.Seeders
{
    public class RoleSeeder
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public RoleSeeder(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        /// <summary>
        /// Run the seeder
        /// </summary>
        public async Task Run()
        {
            foreach (var role in new List<string> {"Admin", "Moderator", "Player"})
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole
                    {
                        Name = role
                    });
                }
            }

            var user = new IdentityUser
            {
                Email = "reversi@klaasboer.org",
                UserName = "reversi@klaasboer.org",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
            };

            if (await _userManager.FindByEmailAsync(user.Email) == null)
            {
                await _userManager.CreateAsync(user, "DEFAULT_SEED_PASSWORD_DO_NOT_USE_or_YOU_WILL_BE_FIRED_1$");
                await _userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}