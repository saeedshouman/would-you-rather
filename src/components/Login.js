import React, { Component } from "react";
import { Card, Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    selectUser: '',
  };

  componentDidMount() {
    const {
      history
    } = this.props;
    history.push("/login");
  }

  handleUserSelection = (event, data) => {
    this.setState({ selectUser: data.value });
  };

  handleUserLogin = () => {
    const { history } = this.props;
    this.props.setAuthedUser(this.state.selectUser);
      history.push("/");
  };
  render() {
    const { users } = this.props;
    const userOptions = Object.keys(users).map((userId) => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL },
    }));
    return (
      <Card.Group centered style={{marginTop:"35px"}}>
        <Card>
          <Card.Content>
            <Card.Header>Would You Rather App!</Card.Header>
            </Card.Content>
          <Card.Content>
          <Card.Meta>Please sign in to continue</Card.Meta>
            <Dropdown
              placeholder="Select a User"
              fluid
              selection
              options={userOptions}
              onChange={this.handleUserSelection}
            />
            </Card.Content>
            <Button primary color='blue' onClick={this.handleUserLogin} disabled={this.state.selectUser === ''}>
              Sign in
            </Button>
          
        </Card>
      </Card.Group>
    );
  }
}
const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps, { setAuthedUser })(Login);
