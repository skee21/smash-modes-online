import React from "react";
import fighters from "./fighterNames.json";
import { FighterBox } from "./FighterBox.js";
import { Button } from "react-bootstrap";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.maxWins = Math.floor(fighters.length / 4) + 1;
  }
  initialState = () => ({
    available: fighters.reduce((o, fighter) => ({ ...o, [fighter]: true }), {}),
    p1: { wins: 17, picks: [] },
    p2: { wins: 0, picks: [] },
    turn: "p1",
    gameMode: 1, //0-setup mercy and names, 1-picking chars, 2-after game, 3-game over
    winner: "",
    p1Pick: "none",
    p2Pick: "none",
    totalBattles: 0
  });
  toFileName = s => {
    var rebuilt = "";
    for (var x of s) {
      if (x === " " || x === "-") {
        rebuilt += "_";
      } else if (x === "&") {
        rebuilt += "and";
      } else if (x !== ".") {
        rebuilt += x;
      }
    }
    return rebuilt.toLowerCase();
  };
  setUsed = name => {
    const { available, p1, p2, turn } = this.state;
    const [{ picks: p1picks }, { picks: p2picks }] = [p1, p2];
    this.setState({ available: { ...available, [name]: false } });
    if (turn === "p1") {
      this.setState({ p1: { ...p1, picks: [...p1picks, name] }, turn: "p2" });
    } else {
      this.setState({
        p2: { ...p2, picks: [...p2picks, name] },
        turn: "p1",
        gameMode: 2
      });
    }
  };
  setPick = name => {
    if (this.state.turn === "p1") {
      this.setState({ p1Pick: name });
    } else {
      this.setState({ p2Pick: name });
    }
  };
  setWinner = val => {
    const { p1, p2, totalBattles } = this.state;
    var p1Wins = p1.wins;
    var p2Wins = p2.wins;
    if (val === "p1") {
      p1Wins += 1;
    } else {
      p2Wins += 1;
    }
    if (p1Wins >= this.maxWins) {
      this.setState({ winner: "p1", gameMode: 3 });
    } else if (p2Wins >= this.maxWins) {
      this.setState({ winner: "p2", gameMode: 3 });
    } else {
      this.setState({
        p1: { ...p1, wins: p1Wins },
        p2: { ...p2, wins: p2Wins },
        gameMode: 1,
        p1Pick: "none",
        p2Pick: "none",
        totalBattles: totalBattles + 1
      });
    }
  };
  render() {
    const { setUsed, setWinner, setPick, toFileName, initialState } = this;
    const {
      available,
      p1,
      p2,
      turn,
      gameMode,
      winner,
      p1Pick,
      p2Pick
    } = this.state;
    const images = require.context("./fighter-images", true);
    if (gameMode === 3) {
      const winRoster = winner === "p1" ? p1.picks : p2.picks;
      return (
        <div className="centered-column">
          <div>
            {winRoster.map((name, i) => (
              <img
                src={images(`./${toFileName(name)}.png`)}
                key={i}
                alt={name}
              />
            ))}
          </div>
          <Button onClick={() => this.setState(initialState())}>
            Start Over
          </Button>
        </div>
      );
    } else if (gameMode === 2) {
      return (
        <div className="centered-column">
          <p>Who Won?</p>
          <div>
            <Button variant="outline-secondary" onClick={() => setWinner("p1")}>
              p1
            </Button>
            <Button variant="outline-secondary" onClick={() => setWinner("p2")}>
              p2
            </Button>
          </div>
        </div>
      );
    } else if (gameMode === 1) {
      if (turn)
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <FighterBox
              available={available}
              setUsed={setUsed}
              setPick={setPick}
              toFileName={toFileName}
            />
            <p>{`Choose ${turn}'s char`}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 500
              }}
            >
              <div className="player-box">
                {p1Pick !== "none" && (
                  <img
                    src={images(`./V_${toFileName(p1Pick)}.png`)}
                    alt={p1Pick}
                  />
                )}
                <div className="perfect-center">
                  {p1Pick !== "none" && p1Pick}
                </div>
                <div className="win-circle perfect-center">{p1.wins}</div>
              </div>
              <div className="player-box blue">
                {p2Pick !== "none" && (
                  <img
                    src={images(`./V_${toFileName(p2Pick)}.png`)}
                    alt={p2Pick}
                  />
                )}
                <div className="perfect-center">
                  {p2Pick !== "none" && p2Pick}
                </div>
                <div className="win-circle perfect-center">{p2.wins}</div>
              </div>
            </div>
          </div>
        );
    }
  }
}

export default App;
