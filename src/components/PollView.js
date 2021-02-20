import React, { Component } from "react";
import { connect } from "react-redux";
import AnswerPoll from "./AnswerPoll";
import PollResult from "./PollResult";

class PollView extends Component {

  Answered = () => {
    const { authedUser, questions } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      return null;
    } 

    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  }

  render() {
    const qid = this.props.match.params.question_id;
    return (
      <div>
        {this.Answered() ?
          <PollResult qid={qid} />
          :
          <AnswerPoll qid={qid} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
  };
};

export default connect(mapStateToProps)(PollView);
