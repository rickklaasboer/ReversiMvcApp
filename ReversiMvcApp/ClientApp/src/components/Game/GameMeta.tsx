import {Game} from '@/types';
import React from 'react';

type Props = {
    game: Game;
};

const colors = ['NONE', 'WHITE', 'BLACK'];

export default function GameMeta({game}: Props) {
    return (
        <div className="card">
            <div className="card-header">{game.Token}</div>
            <div className="card-body">
                <h6>Description</h6>
                <p>{game.Description}</p>

                <h6>Turn</h6>
                <p>{game.PlayerTurn && colors[game.PlayerTurn]}</p>

                <h6>Player1Token</h6>
                <p>{game.Player1Token}</p>

                <h6>Player2Token</h6>
                <p>{game.Player2Token ?? 'N/A'}</p>
            </div>
        </div>
    );
}
