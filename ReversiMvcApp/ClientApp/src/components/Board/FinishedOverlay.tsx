import {Game} from '@/types';
import React from 'react';
import {createUseStyles} from 'react-jss';

type Props = {
    game: Game;
};

const useStyles = createUseStyles({
    overlay: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 999,
    },
});

function getWinner(winner: string) {
    return winner ? colors[winner as unknown as 0 | 1 | 2] : 'Unknown';
}

const colors = ['None', 'White', 'Black'];

export default function FinishedOverlay({game}: Props) {
    const styles = useStyles();
    const winner = getWinner(game.Winner);

    return (
        <div className={styles.overlay}>
            <h2>
                The game has finished! The winner is{' '}
                <span className="font-extra-bold">{winner}</span>!
            </h2>
        </div>
    );
}
