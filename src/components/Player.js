import React from 'react';

import MaterialIcon from 'material-icons-react';

import './Player.css';

const Player = ({player, score, winner, loser}) => (
  <div className={loser ? 'playerRoot playerLoser' : 'playerRoot'}>
    <div className="playerImageContainer">
      <img className="playerImage" src={`/images/${player ? player.image : 'placeholder.png'}`} />
      <div className="playerImageEmoji">{player && player.emoji}</div>
    </div>
    <div className="playerInfo">
      <div className="playerCountry">{player ? player.country : 'TBA'}</div>
      <div className="playerName">{player && player.employee}</div>
    </div>
    <div>
      <div className="playerScore">
        {winner && <MaterialIcon icon="stars" color="rgb(221, 163, 51)" />}
        {score && ' ' + score}
      </div>
    </div>
  </div>
);

export default Player;
