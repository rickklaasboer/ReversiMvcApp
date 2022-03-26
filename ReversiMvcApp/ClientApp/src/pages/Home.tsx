import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as SignalR from '@microsoft/signalr';

type Game = {
    Token: string;
    Description: string;
    Player1Token: string;
    Player2Token: string;
    PlayerTurn: 0 | 1;
    Board: Board;
};

type BoardTile = 0 | 1 | 2;

type Board = [
    [
        BoardTile,
        BoardTile,
        BoardTile,
        BoardTile,
        BoardTile,
        BoardTile,
        BoardTile,
        BoardTile,
    ],
];

export default function Home() {
    const {current: hub} = useRef(
        new SignalR.HubConnectionBuilder().withUrl('/hub/home').build(),
    );
    const [games, setGames] = useState<Game[]>([]);

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

    return (
        <table className="table table-striped border">
            <thead>
                <tr>
                    <th scope="col">Player1Token</th>
                    <th scope="col">Player2Token</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                {games?.map(
                    ({Token, Player1Token, Player2Token, Description}) => (
                        <tr key={Token}>
                            <td>{Player1Token}</td>
                            <td>{Player2Token ?? 'N/A'}</td>
                            <td>{Description}</td>
                        </tr>
                    ),
                )}
            </tbody>
        </table>
    );
}
