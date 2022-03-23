using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReversiMvcApp.Models
{
    public class Player
    {
        [Key]
        public string Guid { get; set; }
        
        public string Name { get; set; }
        
        [DefaultValue(0)]
        public int NumberWon { get; set; }
        
        [DefaultValue(0)]
        public int NumberLost { get; set; }

        [DefaultValue(0)]
        public int NumberTied { get; set; }
    }
}