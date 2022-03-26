export type Game = {
    Token: string;
    Description: string;
    Player1Token: string;
    Player2Token: string | null;
    PlayerTurn: 0 | 1;
    Board: number[][];
    IsFinished: boolean;
    Winner: string;
};
