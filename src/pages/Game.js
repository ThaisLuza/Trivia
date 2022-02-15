import React from 'react';
import { Link } from 'react-router-dom';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Olá, Jogador</h1>
      </div>
    );
  }
}

export default Game;
