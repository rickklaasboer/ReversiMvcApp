import React from 'react';
import useHome from '@/hooks/useHome';
import {Game} from '@/types';
import Kanye from '@/components/Kanye';

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

    return (
        <div className="row">
            <div className="col-9">
                {Array.isArray(games) && games.length ? (
                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col">Players</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
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
                ) : (
                    <p>There are no games. Go create one!</p>
                )}
            </div>
            <div className="col-3">
                <Kanye />
            </div>
        </div>
    );
}
