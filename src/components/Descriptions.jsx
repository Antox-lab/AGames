import { React, Component } from "react";
import Item from "./Item";
import data from "./desctiprionData.json";

export default class Description extends Component {
  render() {
    return (
      <section className="gameSection">
        <h1>Description</h1>
        {data.map((item, id) => {
          return (
            <Item
              title={item.title}
              key={id}
              id={id}
              descriptions={item.descriptions}
              setImage={item.image}
              controls={item.controls}
            />
          );
        })}
      </section>
    );
  }
}
