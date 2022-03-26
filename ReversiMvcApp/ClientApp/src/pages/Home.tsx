import React from 'react';
import Spinner from '@/components/Spinner';
import useHome from '@/hooks/useHome';

export default function Home() {
    const {games} = useHome();

    if (!games.length) return <Spinner />;

    return (
        <table className="table table-striped border">
            <thead>
                <tr>
                    <th scope="col">Token</th>
                    <th scope="col">Player1Token</th>
                    <th scope="col">Player2Token</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                {games?.map(
                    ({Token, Player1Token, Player2Token, Description}) => (
                        <tr key={Token}>
                            <td>{Token}</td>
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
