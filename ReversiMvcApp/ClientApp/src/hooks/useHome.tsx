import {useCallback, useEffect, useRef, useState} from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {Game} from '@/types';

export default function useHome() {
    const [games, setGames] = useState<Game[]>([]);

    // SignalR connection
    const {current: hub} = useRef(
        new HubConnectionBuilder().withUrl('/hubs/home').build(),
    );

    useEffect(() => {
        (async () => {
            await hub.start();

            await hub.send('init');
            hub.on('INIT_RECEIVED', ({games}) => {
                setGames(JSON.parse(games));
            });

            hub.on('GAME_CREATED', onGameCreated);
        })();
    }, []);

    const onGameCreated = useCallback(
        (game) => {
            const parsed = JSON.parse(game) as Game;
            setGames((prevState) => [parsed, ...prevState]);
        },
        [JSON.stringify(games)],
    );

    return {
        games,
    };
}
