import {useEffect, useRef, useState} from 'react';
import toast from 'react-hot-toast';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {Game as GameType} from '@/types';
import {GAME_EVENTS} from '@/components/constants/game';

export default function useGame() {
    const [game, setGame] = useState<GameType>();

    // Game UUID
    const {current: uuid} = useRef(
        (() => {
            const url = new URL(window.location.href);
            return url.pathname.split('/')[3];
        })(),
    );

    // SignalR connection
    const {current: hub} = useRef(
        new HubConnectionBuilder().withUrl('/hubs/game').build(),
    );

    useEffect(() => {
        (async () => {
            await hub.start();

            await hub.send('JoinRoom', uuid);
            await hub.send('Init', uuid);

            hub.on(GAME_EVENTS.GAME_INIT, onGameUpdated);
            hub.on(GAME_EVENTS.PLAYER_JOINED, console.log);
            hub.on(GAME_EVENTS.PLAYER_LEFT, console.log);
            hub.on(GAME_EVENTS.FICHE_PLACED, onGameUpdated);
            hub.on(GAME_EVENTS.PLAYER_ABANDONED_TURN, onGameUpdated);
            hub.on(GAME_EVENTS.INVALID_FICHE_PLACEMENT, () => {
                toast.error('Invalid fiche placement');
            });
            hub.on(GAME_EVENTS.INVALID_SKIP_REQUEST, () => {
                toast.error(
                    'Invalid skip request, there is still a move possible',
                );
            });
            hub.on(GAME_EVENTS.GAME_FINISHED, (game) => {
                toast.success('The game has finished!');
                onGameUpdated(game);
            });
        })();
    }, []);

    async function onGameUpdated(game: string) {
        const parsed = JSON.parse(game) as GameType;
        setGame(parsed);
    }

    async function onTileClick(x: number, y: number) {
        await hub.send('PlaceFiche', uuid, x, y, 1);
    }

    async function onSkip() {
        await hub.send('AbandonTurn', uuid);
    }

    return {
        game,
        onTileClick,
        onSkip,
    };
}
