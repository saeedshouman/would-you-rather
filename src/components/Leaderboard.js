import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Grid, Image, Label } from "semantic-ui-react";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const rankColor = ["red", "orange", "grey"];
    let rank = 0;
    const usersWithScore = {};
    Object.keys(users).map((uid) => {
      const user = users[uid];
      const answeredQuestions = Object.keys(user.answers).length;
      const createdQuestions = user.questions.length;
      user.score = answeredQuestions + createdQuestions;
      return (usersWithScore[uid] = user);
    });

    const usersWithScoreSorted = {};
    Object.keys(users)
      .map((uid) => users[uid])
      .sort((a, b) => b.score - a.score)
      .forEach((user) => {
        usersWithScoreSorted[user.id] = user;
      });

    const userCards = Object.keys(usersWithScoreSorted).map((uid) => {
      const user = usersWithScoreSorted[uid];
      let label = null;
      let awardColor = rankColor[rank++];
      if (awardColor) {
        label = {
          as: "div",
          corner: "left",
          icon: "trophy",
          color: awardColor,
        };
      }
      const answeredQuestions = Object.keys(user.answers).length;
      const createdQuestions = user.questions.length;
      const score = answeredQuestions + createdQuestions;
      return (
        <Card key={uid} style={{ width: "400px" }}>
          <Image fluid label={label} />
          <Card.Content>
            <Image floated="right" size="tiny" src={user.avatarURL} />
            <Card.Header style={{ marginTop: "20px" }}>{user.name}</Card.Header>
            <Card.Meta>Rank: {rank}</Card.Meta>
            <Card.Description style={{ marginLeft: "20px" }}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={12} textAlign="center">
                    <Grid>
                      <Grid.Column width={10}> Answered Questions</Grid.Column>
                      <Grid.Column> {answeredQuestions}</Grid.Column>
                    </Grid>
                    <Grid>
                      <Grid.Column width={10}>Created Questions</Grid.Column>
                      <Grid.Column> {createdQuestions}</Grid.Column>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Grid.Column>Score</Grid.Column>
                    <br />
                    <Grid.Column>
                      <Label circular color={awardColor} size={"large"}>
                        {score}
                      </Label>
                    </Grid.Column>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
    return <Card.Group centered>{userCards}</Card.Group>;
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Leaderboard);
