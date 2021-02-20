import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

class NavMenu extends Component {
  state = { activeItem: "home" };
  //tab change for active
  handleItemClick = (e, data) => this.setState({ activeItem: data.name });
  render() {
    const { activeItem } = this.state;
    const { users, authedUser } = this.props;
    const { name, avatarURL } = users[authedUser];
    return (
      <div>
        <Menu pointing secondary>
          <NavLink to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="/newquestion">
            <Menu.Item
              name="New Question"
              active={activeItem === "New Question"}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="/leaderboard">
            <Menu.Item
              name="leaderboard"
              active={activeItem === "leaderboard"}
              onClick={this.handleItemClick}
            ></Menu.Item>
          </NavLink>
          <Menu.Menu position="right">
            <span
              style={{ color: "black", marginRight: "10px", marginTop: "5px" }}
            >
              Hello, {name}
              <img className="ui avatar image" src={avatarURL} alt={name} />
            </span>
            <NavLink to="/logout">
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={this.handleItemClick}
              />
            </NavLink>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { authedUser: state.authedUser, users: state.users };
};

export default connect(mapStateToProps)(NavMenu);
