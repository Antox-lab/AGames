import { React, Component } from "react";
export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dl: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({
      dl: !this.state.dl,
    });
  }
  render() {
    return (
      <>
        <div
          className="descriptionCaption"
          key={this.props.id}
          onClick={this.onToggle}
        >
          <h1>{this.props.title}</h1>
          <div className={this.state.dl ? "descriptionSection" : "hide"}>
            <h3>{this.props.descriptions}</h3>
            <hr />
            <img src={this.props.setImage} alt="img" />
            <hr />
            <h1>Controls:</h1>
            {this.props.controls.map((pos) => {
              return <h3>{pos}</h3>;
            })}
          </div>
        </div>
      </>
    );
  }
}
