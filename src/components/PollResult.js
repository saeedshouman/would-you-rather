import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Image,
  Segment,
  Label,
  Header,
  Progress,
  Button,
} from "semantic-ui-react";

class PollResult extends Component {
  render() {
    const { qid, authedUser, questions, users } = this.props;

    const question = questions[qid];

    const user = users[question.author];

    const votedForOptionOne = question.optionOne.votes.includes(authedUser);
    const votedForOptionTwo = question.optionTwo.votes.includes(authedUser);

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;

    const totalVotes = optionOneVotes + optionTwoVotes;
    const percentOpOne = ((optionOneVotes / totalVotes) * 100).toFixed(2);
    const percentOpTwo = ((optionTwoVotes / totalVotes) * 100).toFixed(2);

    if (!question) {
      return;
    }

    return ( 
      <Card.Group centered>
        <Card key={qid} style={{ width: "400px" }}>
          <Card.Content>
            <Image floated="right" size="tiny" src={user.avatarURL} />
            <Card.Header>Asked by {user.name}</Card.Header>
            <Card.Description>
              <Segment color="grey">
                <Header as="h3">Results:</Header>
                <Segment vertical>
                  {votedForOptionOne && (
                    <Label color="blue" ribbon="right">
                      Your Vote
                    </Label>
                  )}
                  <p>Would you rather {question.optionOne.text}?</p>
                  <Progress color={"blue"} percent={percentOpOne} progress>
                    {optionOneVotes} out of {totalVotes} votes
                  </Progress>
                </Segment>

                <Segment vertical>
                  {votedForOptionTwo && (
                    <Label color="blue" ribbon="right">
                      Your Vote
                    </Label>
                  )}
                  <p>Would you rather {question.optionTwo.text}?</p>
                  <Progress color={"blue"} percent={percentOpTwo} progress>
                    {optionTwoVotes} out of {totalVotes} votes
                  </Progress>
                </Segment>
              </Segment>
            </Card.Description>
          </Card.Content>
          <Button primary fluid as={NavLink} to="/">
            Back
          </Button>
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
export default connect(mapStateToProps)(PollResult);
