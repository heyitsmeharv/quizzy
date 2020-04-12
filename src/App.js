import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// pages
import StartPage from './pages/Start/Start';
import QuestionsPage from './pages/Questions/Questions';

// styles
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Luckiest Guy',
    ].join(','),
  },
  palette: {
    primary: blue,
  },
  status: {
    danger: 'orange',
  },
});

const App = () => {
  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup component={null}>
                <CSSTransition
                  timeout={300}
                  classNames="page"
                  key={location.key}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/quizzy" />} />
                    <Route exact path="/quizzy" component={StartPage} />
                    <Route exact path="/questions" component={QuestionsPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </MuiThemeProvider>
    </HashRouter>
  );
}

export default App;
