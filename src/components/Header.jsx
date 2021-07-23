import { React, Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header>
        <img src="img/logo.png" alt="logo" />
        <div className="navBlock">
          <NavLink
            exact
            className="linkButton"
            activeClassName="activeLinkButton"
            to="/"
          >
            Descriptions
          </NavLink>
          <NavLink
            className="linkButton"
            activeClassName="activeLinkButton"
            to="/labirint"
          >
            Dark Labyrinth
          </NavLink>
          <NavLink
            className="linkButton"
            activeClassName="activeLinkButton"
            to="/jump"
          >
            Strong Jump
          </NavLink>
          <NavLink
            className="linkButton"
            activeClassName="activeLinkButton"
            to="/road"
          >
            Crazy Road
          </NavLink>
          <NavLink
            className="linkButton"
            activeClassName="activeLinkButton"
            to="/shoot"
          >
            Fanny Shoot
          </NavLink>
        </div>
      </header>
    );
  }
}
