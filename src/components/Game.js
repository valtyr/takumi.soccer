import React from 'react';
import Moment from 'react-moment';

import MaterialIcon from 'material-icons-react';

import './Game.css';

import {Player} from '.';

const sidebarForGame = game => {
  const {date} = game;

  switch (game.status) {
    case 'FINISHED':
      return null;
    case 'IN_PLAY':
      return <div className="recordIndicator" />;
    default:
      return (
        <div className="gameInfo">
          <div className="gameDate">
            <Moment date={date} calendar />
          </div>
        </div>
      );
  }
};

const Game = ({game}) => {
  const {homeTeam, awayTeam, result, date} = game;

  const finished = game.status === 'FINISHED';

  return (
    <div className="gameRoot">
      <div className="gameTeams">
        <Player
          player={game.homeTeam}
          score={result.goalsHomeTeam}
          winner={finished && result.goalsHomeTeam > result.goalsAwayTeam}
          loser={finished && result.goalsHomeTeam < result.goalsAwayTeam}
        />
        <Player
          player={game.awayTeam}
          score={result.goalsAwayTeam}
          winner={finished && result.goalsAwayTeam > result.goalsHomeTeam}
          loser={finished && result.goalsAwayTeam < result.goalsHomeTeam}
        />
      </div>
      {sidebarForGame(game)}
    </div>
  );
};

export default Game;
