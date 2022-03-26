import React from 'react';
import {Toaster} from 'react-hot-toast';
import {createUseStyles} from 'react-jss';
import GameMeta from '@/components/Game/GameMeta';
import useGame from '@/hooks/useGame';
import GameActions from '@/components/Game/GameActions';
import FinishedOverlay from '@/components/Board/FinishedOverlay';
import GameBoard from '@/components/Board/GameBoard';
import Spinner from '@/components/Spinner';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    board: {
        position: 'relative',
        marginRight: 12,
        background: '#2A2D34',
        border: '15px solid #2A2D34',
        aspectRatio: '1/1',
        height: '75vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        columnGap: 3,
        rowGap: 3,
    },
});

export default function Game() {
    const styles = useStyles();
    const {game, onTileClick, onSkip} = useGame();

    if (!game) return <Spinner />;

    return (
        <>
            <Toaster position="top-right" />
            <div className={styles.wrapper}>
                <div className={styles.board}>
                    {game.IsFinished ? <FinishedOverlay game={game} /> : null}
                    <GameBoard game={game} onTileClick={onTileClick} />
                </div>
                {game ? (
                    <div>
                        <GameMeta game={game} />
                        <GameActions onSkip={onSkip} onLeave={() => null} />
                    </div>
                ) : null}
            </div>
        </>
    );
}
