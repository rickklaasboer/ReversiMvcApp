import React from 'react';

type Props = {
    onSkip: () => any;
    onLeave: () => any;
};

export default function GameActions({onSkip, onLeave}: Props) {
    return (
        <div className="card mt-3">
            <div className="card-header">Actions</div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <button
                        onClick={onSkip}
                        className="btn btn-warning w-100 mr-1"
                    >
                        Skip
                    </button>
                    <button
                        onClick={onLeave}
                        className="btn btn-danger w-100 ml-1"
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
}
