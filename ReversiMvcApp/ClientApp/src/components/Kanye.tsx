import React from 'react';
import kanye from '@/assets/kanye.jpg';
import {createUseStyles} from 'react-jss';
import useKanyeWestApi from '@/hooks/useKanyeWestApi';

const useStyles = createUseStyles({
    kanye: {
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '.25rem',
        transform: 'scaleX(-1)',
    },
    quote: {
        borderLeftColor: '#eeeeee',
        borderLeft: 'solid',
        borderLeftWidth: 5,
        paddingLeft: 8,
        fontSize: '1.1rem',
    },
});

export default function Kanye() {
    const {quote} = useKanyeWestApi();
    const styles = useStyles();

    return (
        <div>
            <p className={styles.quote}>{quote}</p>
            <img className={styles.kanye} src={kanye}></img>
            <small>Ye West (previously known as "Kanye")</small>
        </div>
    );
}
