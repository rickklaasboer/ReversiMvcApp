import React from 'react';
import ReactDOM from 'react-dom';
import Game from './pages/Game';
import Home from './pages/Home';

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}

if (document.getElementById('game')) {
    ReactDOM.render(<Game />, document.getElementById('game'));
}
