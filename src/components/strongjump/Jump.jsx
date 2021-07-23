import { React, Component } from "react";
import draw from "./jump_game";

export default class Jump extends Component {
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
      () => draw(this.state.level)
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
        id: 1,
        value: "Hard",
      },
      {
        id: 2,
        value: "Normal",
      },
      {
        id: 3,
        value: "Easy",
      },
    ];
    return (
      <section className="gameSection">
        <h1>Strong Jump</h1>
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
                className="canvas_1"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="plan"
                className="canvas_2"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="fire"
                className="canvas_3"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="man"
                className="canvas_4"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="paddle"
                className="canvas_5"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="messages"
                className="canvas_6"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="wind"
                className="canvas_7"
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
            <img src="img/games_data/jump.png" alt="Jump" />
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
