import React from 'react';
import Spinner from '@/components/Spinner';
import useHome from '@/hooks/useHome';
import {Game} from '@/types';

/**
 * Derive player count from player tokens
 */
function derivePlayerCountFromTokens(game: Game): string {
    if (!game.Player1Token && !game.Player2Token) {
        return '0/2';
    }

    if (
        (game.Player1Token || game.Player2Token) &&
        !(game.Player1Token && game.Player2Token)
    ) {
        return '1/2';
    }

    return 'Unknown';
}

export default function Home() {
    const {games} = useHome();

    if (!games.length) return <Spinner />;

    return (
        <table className="table table-striped border">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Players</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {games?.map((game) => (
                    <tr key={game.Token}>
                        <td>{game.Description}</td>
                        <td>{derivePlayerCountFromTokens(game)}</td>
                        <td>
                            <a
                                className="btn btn-primary float-right"
                                href={`/game/details/${game.Token}`}
                            >
                                Join
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
