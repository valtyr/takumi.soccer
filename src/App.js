import React, {Component} from 'react';

import players from './data/players.json';

import './App.css';

import Fetch from 'react-fetch-component';
import {Player, Game} from './components';

const POLL_INTERVAL_SECONDS = 20;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <img src="/logo.svg" />
        </div>
        <Fetch url="https://proxy.takumi.soccer/?$url=http://api.football-data.org/v1/competitions/467/fixtures">
          {({loading, error, data, fetch}) => {
            if (!data) return 'Loading';
            if (error) return 'Error';

            // Dirty polling 😈
            setTimeout(fetch, POLL_INTERVAL_SECONDS * 1000);

            const games = data.fixtures.map(game => {
              if (game.homeTeamName === '' || game.awayTeamName === '') return game;
              const homeTeam = players.find(player => player.country === game.homeTeamName);
              const awayTeam = players.find(player => player.country === game.awayTeamName);

              if (!homeTeam || !awayTeam) console.log(game.homeTeamName + ' ' + game.awayTeamName);

              return {
                ...game,
                homeTeam,
                awayTeam,
              };
            });

            const groupStages = games.filter(game => game.matchday in [1, 2, 3]);
            const roundOf16 = games.filter(game => game.matchday === 4);
            const quarterFinals = games.filter(game => game.matchday === 5);
            const semiFinals = games.filter(game => game.matchday === 6);
            const thirdPlace = games.filter(game => game.matchday === 7);
            const final = games.filter(game => game.matchday === 8);

            return (
              <div>
                <h1>Group stages</h1>
                <div className="grid">
                  {groupStages.map(game => (
                    <div className="halfWidth">
                      <Game key={game.date} game={game} />
                    </div>
                  ))}
                </div>

                <h1>Round of 16</h1>
                <div className="grid">
                  {roundOf16.map(game => (
                    <div className="halfWidth">
                      <Game key={game.date} game={game} />
                    </div>
                  ))}
                </div>

                <h1>Quarter-finals</h1>
                <div className="grid">
                  {quarterFinals.map(game => (
                    <div className="halfWidth">
                      <Game key={game.date} game={game} />
                    </div>
                  ))}
                </div>

                <h1>Semi-finals</h1>
                <div>{semiFinals.map(game => <Game key={game.date} game={game} />)}</div>

                <h1>Third place playoff</h1>
                <div>{thirdPlace.map(game => <Game key={game.date} game={game} />)}</div>

                <h1>Final</h1>
                <div>{final.map(game => <Game key={game.date} game={game} />)}</div>

                <div className="footer">⚽️</div>
              </div>
            );
          }}
        </Fetch>
      </div>
    );
  }
}

export default App;
