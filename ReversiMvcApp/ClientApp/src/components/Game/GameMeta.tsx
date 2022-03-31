import React, {ReactNode} from 'react';
import {Game} from '@/types';

type Props = {
    game: Game;
    children?: ReactNode;
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

export default function GameMeta({game, children}: Props) {
    return (
        <div className="card w-100">
            <div className="card-header">{game.Description}</div>
            <div className="card-body">
                <h6>Turn</h6>
                <p className="mb-0">
                    {game.PlayerTurn && colors[game.PlayerTurn]}
                    <i> (You are {whoAmI(game).toLowerCase()})</i>
                </p>
            </div>
            {children}
        </div>
    );
}
