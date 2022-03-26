import React from 'react';
import {Classes} from 'jss';
import {createUseStyles} from 'react-jss';

type Props = {
    color: number;
};

/**
 * Derive styles from color
 */
function deriveStylesFromColor(color: number, styles: Classes) {
    return [styles.fiche, color === 1 ? styles.white : styles.black].join(' ');
}

const useStyles = createUseStyles({
    fiche: {
        width: '75%',
        height: '75%',
        borderRadius: '100%',
    },
    white: {
        background: '#EFE9F4',
    },
    black: {
        background: '#2A2D34',
    },
});

export default function Fiche({color}: Props) {
    const styles = useStyles();
    return <div className={deriveStylesFromColor(color, styles)} />;
}
