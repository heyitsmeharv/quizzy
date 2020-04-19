import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';
import QuestionActions from '../../store/actions';

// components
import Button from '@material-ui/core/Button';
import Header from '../../components/Header/Header.js';
import TextField from '@material-ui/core/TextField';

// styles
import style from './styles.module.scss';

class StartPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'username',
    ];
    this.state = {}
  }

  handleButtonClick = (type) => {
    if (type === 'Go') {
      this.props.history.push('/questions');
    } else {
      this.props.history.push('/leaderboards');
    }
    QuestionActions.saveUsername(this.state.username);
  };

  handleOnChangeUsername = username => event  => {
    this.setState({
      [username]: event.target.value,
    });
  };

  render() {
    return (
      <div className={style.container}>
        <Header text="QUIZZY" />
        <div className={style.textFieldWrapper}>
          <p className={style.text}>Please Enter Your Player Name:</p>
          <TextField id="standard-uncontrolled" onChange={this.handleOnChangeUsername('username')} label="Player Name" variant="outlined" />
        </div>
        <div className={style.buttonWrapper}>
          <Button className={style.button} onClick={() => this.handleButtonClick('Go')} variant="contained" color="primary">
            Go!
          </Button>
          {/* <Button className={style.button} onClick={() => this.handleButtonClick('HighScore')} variant="contained" color="primary">
            High Scores!
        </Button> */}
        </div>
      </div>
    );
  }
}

export default StartPage;
