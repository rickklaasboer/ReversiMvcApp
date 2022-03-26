import {Game} from '@/types';
import React from 'react';
import Fiche from './Fiche';
import Tile from './Tile';

type Props = {
    game: Game;
    onTileClick: (x: number, y: number) => Promise<void>;
};

export default function GameBoard({game, onTileClick}: Props) {
    return (
        <>
            {game?.Board.map((row, y) => {
                return row.map((color, x) => {
                    return (
                        <Tile
                            key={`${x}-${y}`}
                            onClick={onTileClick}
                            x={x}
                            y={y}
                        >
                            {color !== 0 && <Fiche color={color} />}
                        </Tile>
                    );
                });
            })}
        </>
    );
}
