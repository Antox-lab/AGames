import { React, Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Description from "./Descriptions";
import Dark from "./darklabirint/Dark";
import Jump from "./strongjump/Jump";
import Road from "./crazyroad/Road";
import Shoot from "./fannyshoot/Shoot";

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Description} />
          <Route path="/labirint" component={Dark} />
          <Route path="/jump" component={Jump} />
          <Route path="/road" component={Road} />
          <Route path="/shoot" component={Shoot} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}
