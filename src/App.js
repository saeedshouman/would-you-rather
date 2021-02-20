import React, { Component, Fragment } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitData } from "./actions/shared";

import Login from "./components/Login";
import Leaderboard from "./components/Leaderboard";
import NavMenu from "./components/NavMenu";
import Logout from "./components/Logout";
import NewQuestion from "./components/NewQuestion";
import PollView from "./components/PollView";
import Question from "./components/Question";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  state = { activeIndex: 0 };
  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };

  componentDidMount() {
    const { handleInitData } = this.props;
    handleInitData();
  }
  render() {
    const { authedUser } = this.props;

    return (
      <BrowserRouter>
        {!authedUser ? (
          <Route path="/" component={Login} />
        ) : (
          <Fragment>
            <NavMenu />
            <div style={{ marginTop: "10px" }}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return (
                      <Question
                        handleTabChange={this.handleTabChange}
                        activeIndex={this.state.activeIndex}
                      />
                    );
                  }}
                />
                <Route path="/questions/:question_id" component={PollView} />
                <Route
                  path="/newquestion"
                  render={() => {
                    return <NewQuestion />;
                  }}
                />
                <Route component={Leaderboard} path="/leaderboard" />
                <Route path="/logout" component={Logout} />
                <Route path="/404" component={ErrorPage} />
              </Switch>
            </div>
          </Fragment>
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const { authedUser } = state;
  return { authedUser };
};
export default connect(mapStateToProps, { handleInitData })(App);
