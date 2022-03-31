import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import {Game} from '@/types';

type Props = {
    game: Game;
};

const chartOptions = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function FicheDistributionChart({game}: Props) {
    const data = (() => {
        let white = 0;
        let black = 0;

        game?.Board.map((row, y) => {
            return row.map((_, x) => {
                if (game.Board[y][x] === 1) {
                    white++;
                } else if (game.Board[y][x] === 2) {
                    black++;
                }
            });
        });

        return [black, white];
    })();

    return (
        <div className="card w-100 mt-3">
            <div className="card-header">Fiche distribution</div>
            <div className="card-body">
                <Doughnut
                    width={200}
                    height={200}
                    data={{
                        labels: ['Black', 'White'],
                        datasets: [
                            {
                                data,
                                backgroundColor: ['#2A2D34', '#EFE9F4'],
                                borderColor: ['#191b1f', '#b4adba'],
                            },
                        ],
                    }}
                    options={chartOptions}
                />
            </div>
            <div className="card-footer d-flex align-items-center justify-content-center">
                Black: {data[0]} &mdash; White: {data[1]}
            </div>
        </div>
    );
}
