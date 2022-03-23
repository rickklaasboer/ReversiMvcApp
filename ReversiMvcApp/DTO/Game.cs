﻿namespace ReversiMvcApp.DTO
{
    public enum Color
    {
        None,
        White,
        Black
    }

    public class Game
    {
        public string Token { get; set; }

        // public int ID { get; set; }
        public string Description { get; set; }

        public string Player1Token { get; set; }
        public string Player2Token { get; set; }

        public Color[,] Board { get; set; }

        public Color PlayerTurn { get; set; }

        public override string ToString()
        {
            return $"Token={Token};\nDescription={Description};\nPlayer1Token={Player1Token};\nPlayer2Token={Player2Token};\nBoard={Board};\nPlayerTurn={PlayerTurn};";
        }
    }
}