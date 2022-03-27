import {Game} from '@/types';
import React from 'react';

type Props = {
    game: Game;
};

const colors = ['None', 'White', 'Black'];

function whoAmI({Player1Token}: Game) {
    const token = document.getElementById('game')?.dataset.playertoken;

    if (Player1Token === token) {
        return colors[1];
    } else {
        return colors[2];
    }
}

export default function GameMeta({game}: Props) {
    return (
        <div className="card w-100">
            <div className="card-header">{game.Description}</div>
            <div className="card-body">
                <h6>Turn</h6>
                <p className="mb-0">
                    {game.PlayerTurn && colors[game.PlayerTurn]}
                    <i> (You are {whoAmI(game)})</i>
                </p>
            </div>
        </div>
    );
}
