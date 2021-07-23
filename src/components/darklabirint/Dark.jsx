import { React, Component } from "react";
import draw from "./dark_game";
import { wals } from "./levels";

export default class DarkTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: false,
      level: 0,
    };
    this.onSetStart = this.onSetStart.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onSetStart() {
    this.setState(
      {
        action: true,
      },
      () => draw(this.state.level)
    );
  }

  onReset() {
    this.setState({
      action: false,
    });
  }

  render() {
    return (
      <section className="gameSection">
        <h1>Dark Labyrinth</h1>
        <h2>Level {this.state.level + 1}</h2>
        {this.state.action ? (
          <>
            <input
              type="button"
              className="gameButtons resetButton"
              value="RESET"
              onClick={this.onReset}
            />
            <div className="jumpFrame">
              <canvas id="canvas" width="480" height="360"></canvas>
            </div>
          </>
        ) : (
          <>
            <input
              type="button"
              className="gameButtons startButton"
              value="START"
              onClick={this.onSetStart}
            />
            <img src="img/games_data/dark.png" alt="Dark" />
            <div>
              {wals.map((item, id) => {
                return (
                  <input
                    type="button"
                    className={
                      id === this.state.level
                        ? "levelButton activeLevelButton"
                        : "levelButton"
                    }
                    key={id}
                    id={item[0].id}
                    value={id + 1}
                    onClick={() => {
                      this.setState({
                        level: id,
                      });
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </section>
    );
  }
}
