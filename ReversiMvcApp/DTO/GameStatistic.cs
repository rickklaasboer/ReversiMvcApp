using Microsoft.AspNetCore.Identity;

namespace ReversiMvcApp.DTO
{
    public class GameStatistic
    {
        public string Token { get; set; }
        public string WinningPlayer { get; set; }
        public string Player1Token { get; set; }
        public string Player2Token { get; set; }

        // public IdentityUser Player1;
        //
        // public IdentityUser Player2;
    }
}