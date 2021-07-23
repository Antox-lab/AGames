import { React, Component } from "react";
import draw from "./shoot_game";

export default class Shoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: false,
      level: 1,
      levelName: "Normal",
    };

    this.onSetStart = this.onSetStart.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onSetStart() {
    this.setState(
      {
        action: true,
      },
      () => draw(this.state.level + 1)
    );
  }

  onReset() {
    this.setState({
      action: false,
    });
  }

  render() {
    const lavels = [
      {
        id: 3,
        value: "Easy",
      },
      {
        id: 2,
        value: "Normal",
      },
      {
        id: 1,
        value: "Hard",
      },
    ];
    return (
      <section className="gameSection">
        <h1>Fanny Shoot</h1>
        <h2>Level is {this.state.levelName}</h2>
        {this.state.action ? (
          <>
            <input
              type="button"
              className="gameButtons resetButton"
              value="RESET"
              onClick={this.onReset}
            />
            <div className="jumpFrame">
              <canvas
                id="background"
                class="canvas_1"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="hole"
                class="canvas_2 shoot_canvas"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="shoot"
                class="canvas_3 shoot_canvas"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="ball"
                class="canvas_4 shoot_canvas"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="messages"
                class="canvas_5 shoot_canvas"
                width="480"
                height="360"
              ></canvas>
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
            <img src="img/games_data/shoot.png" alt="Jump" />
            <div>
              {lavels.map((item, id) => {
                return (
                  <input
                    type="button"
                    className={
                      id === this.state.level
                        ? "levelButton strongLevelButton activeLevelButton"
                        : "levelButton strongLevelButton"
                    }
                    key={id}
                    id={item.id}
                    value={item.value}
                    onClick={() => {
                      this.setState({
                        level: id,
                        levelName: item.value,
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
