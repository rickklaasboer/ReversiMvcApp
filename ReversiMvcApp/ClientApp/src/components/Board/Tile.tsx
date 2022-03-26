import React, {ReactNode} from 'react';
import {Classes} from 'jss';
import {createUseStyles} from 'react-jss';

type Props = {
    x: number;
    y: number;
    onClick?: (x: number, y: number) => any;
    children?: ReactNode;
};

/**
 * Derives styles from position
 */
function deriveStylesFromPosition(x: number, y: number, styles: Classes) {
    return [
        styles.tile,
        y % 2 == 0
            ? x % 2 == 0
                ? styles.odd
                : styles.even
            : x % 2 == 0
            ? styles.even
            : styles.odd,
    ].join(' ');
}

const useStyles = createUseStyles({
    tile: {
        transition: 'all 250ms ease-in-out',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '&:hover': {
            cursor: 'pointer',
            opacity: 0.75,
        },
    },
    even: {
        backgroundColor: '#01783f',
    },

    odd: {
        backgroundColor: '#0bba6d',
    },
});

export default function Tile({x, y, onClick, children}: Props) {
    const styles = useStyles();
    const key = `${x}-${y}`;

    return (
        <div
            key={key}
            onClick={() => onClick?.(x, y)}
            className={deriveStylesFromPosition(x, y, styles)}
        >
            {children}
        </div>
    );
}
