import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Card, Image, Tab } from "semantic-ui-react";

class Question extends Component {
  filterQuestions = (question) => {
    const { questions, users } = this.props;
    const questionCard = Object.keys(questions)
      .filter(question)
      .map((qid) => {
        const question = questions[qid];
        const user = users[question.author];
        return (
          <Card key={qid} style={{ width: "400px" }}>
            <Card.Content>
              <Image floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>
                Would you rather {question.optionOne.text} or
                {" " + question.optionTwo.text} ?
              </div>
            </Card.Content>
            <Card.Content extra>
              <Button as={NavLink} primary fluid to={`/questions/${qid}`}>
                View Poll
              </Button>
            </Card.Content>
          </Card>
        );
      });

    return questionCard.length
      ? [
          questionCard.length,
          <Card.Group centered>{questionCard}</Card.Group>,
        ]
      : [questionCard.length];
  };

  render() {
    const { questions, authedUser, activeIndex, handleTabChange } = this.props;

    const [
      unansweredTotal,
      filterUnanswered = "All questions have been answered.",
    ] = this.filterQuestions(
      (id) =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    );

    const [
      answeredTotal,
      filterAnswered = "There are no answered questions available.",
    ] = this.filterQuestions(
      (qid) =>
        questions[qid].optionOne.votes.includes(authedUser) ||
        questions[qid].optionTwo.votes.includes(authedUser)
    );
    const panes = [
      {
        menuItem: `Unanswered Questions (${unansweredTotal})`,
        render: () => <Tab.Pane attached={false}>{filterUnanswered}</Tab.Pane>,
      },
      {
        menuItem: `Answered Questions (${answeredTotal})`,
        render: () => <Tab.Pane attached={false}>{filterAnswered}</Tab.Pane>,
      },
    ];

    return (
      <div>
        <div>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
        </div>
      </div>
    );
  }
}

const sortQuestions = (questions) => {
  const sortResult = {};
  Object.keys(questions)
    .map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((question) => {
      sortResult[question.id] = question;
    });
  return sortResult;
};

const mapStateToProps = (state) => {
  return {
    questions: sortQuestions(state.questions),
    users: state.users,
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(Question);
