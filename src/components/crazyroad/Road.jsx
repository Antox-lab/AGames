import { React, Component } from "react";
import draw from "./road_game";

export default class Road extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: false,
    };
    this.onReset = this.onReset.bind(this);
    this.onSetStart = this.onSetStart.bind(this);
  }

  onReset() {
    this.setState({
      action: false,
    });
  }

  onSetStart() {
    this.setState(
      {
        action: true,
      },
      () => draw()
    );
  }

  render() {
    return (
      <section className="gameSection">
        <h1>Crazy Road</h1>
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
                id="man"
                className="canvas_2"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="car"
                className="canvas_3"
                width="480"
                height="360"
              ></canvas>
              <canvas
                id="messages"
                className="canvas_4"
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
            <img src="img/games_data/road.png" alt="Road" />
          </>
        )}
      </section>
    );
  }
}
