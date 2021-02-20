import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { Card, Image, Radio, Form, Button } from "semantic-ui-react";

class AnswerPoll extends Component {
  state = { votedForOption: null };
  handleChange = (e, data) => {
    this.setState({ votedForOption: data.value });
  };

  handleClick = () => {
    const qid = this.props.qid;
    const answer = this.state.votedForOption;
    const { authedUser, handleAnswerQuestion } = this.props;
    handleAnswerQuestion({ authedUser, qid, answer });
  };
  render() {
    const qid = this.props.qid;
    const { questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];
    const disabled = !this.state.votedForOption;
    return (
      <Card.Group centered>
        <Card key={qid} style={{ width: "400px" }}>
          <Card.Content>
            <Image floated="right" size="tiny" src={user.avatarURL} />
            <Card.Header>{user.name} asks</Card.Header>
            <div>Would you rather</div>
            <Card.Description>
              <Form>
                <Form.Field>
                  <Radio
                    label={question.optionOne.text}
                    name="radioGroupVote"
                    value="optionOne"
                    checked={this.state.votedForOption === "optionOne"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={question.optionTwo.text}
                    name="radioGroupVote"
                    value="optionTwo"
                    checked={this.state.votedForOption === "optionTwo"}
                    onChange={this.handleChange}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
    users: state.users,
  };
};
export default connect(mapStateToProps, { handleAnswerQuestion })(AnswerPoll);
