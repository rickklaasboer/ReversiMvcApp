using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ReversiMvcApp.Models
{
    public class ManageUserViewModel
    {
        public IdentityUser User { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
        
        public List<string> AvailableRoles { get => new() {"Admin", "Moderator", "Player"}; }
    }
}