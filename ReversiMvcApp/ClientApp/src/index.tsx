import React from 'react';
import ReactDOM from 'react-dom';
import Game from './pages/Game';
import Home from './pages/Home';

const [homeElem, gameElem] = [
    document.getElementById('home'),
    document.getElementById('game'),
];

if (homeElem) {
    ReactDOM.render(<Home />, homeElem);
}

if (gameElem) {
    ReactDOM.render(<Game />, gameElem);
}
