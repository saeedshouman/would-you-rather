import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Button, Card, Form, Image, Input } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    opOne: "",
    opTwo: "",
    backHome: false,
  };

  handleOnChange = (e, data) => {
    e.preventDefault();
    this.setState({ [data.id]: data.value });
  };

  handleClick = async () => {
    const { opOne: optionOneText, opTwo: optionTwoText } = this.state;
    const { authedUser: author } = this.props;

    await this.props.handleAddQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    this.setState({ backHome: true });
  };

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];
    const disabled = this.state.opOne === "" || this.state.opTwo === "";

    return this.state.backHome ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Card.Group centered>
          <Card style={{ width: "400px" }}>
            <Card.Content>
              <Image floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>Would you rather</div>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Input
                      id="opOne"
                      placeholder="Enter Option One Text"
                      value={this.state.opOne}
                      onChange={this.handleOnChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      id="opTwo"
                      placeholder="Enter Option Two Text"
                      value={this.state.opTwo}
                      onChange={this.handleOnChange}
                    />
                  </Form.Field>
                </Form>
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Button
                  primary
                  fluid
                  onClick={this.handleClick}
                  disabled={disabled}
                >
                  Submit
                </Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.users, authedUser: state.authedUser };
};

export default connect(mapStateToProps, { handleAddQuestion })(NewQuestion);
