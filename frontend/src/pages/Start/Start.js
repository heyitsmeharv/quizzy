import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';
import QuestionActions from '../../store/actions';

// components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// icons
import SettingsIcon from '@material-ui/icons/Settings';

// styles
import style from './styles.module.scss';

class StartPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'user'
    ];
    this.state = {}
  }

  handleButtonClick = (type) => {
    if (type === 'Go') {
      this.props.history.push('/questions');
    } else if (type === 'leaderboards') {
      this.props.history.push('/leaderboards');
    } else {
      this.props.history.push('/settings');
    }
    QuestionActions.saveUsername(this.state.user);
  };

  handleOnChangeUsername = user => event => {
    this.setState({
      [user]: event.target.value,
    });
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.settings} onClick={() => this.handleButtonClick('settings')}>
          <SettingsIcon />
        </div>
        <div className={style.header}>
          <div className={style.headerText}>
            QUIZZY
          </div>
        </div>
        <div className={style.textFieldWrapper}>
          {/* <p className={style.text}>Please Enter Your Player Name:</p> */}
          <TextField id="standard-uncontrolled" onChange={this.handleOnChangeUsername('user')} label="Player Name" variant="outlined" />
        </div>
        <div className={style.buttonWrapper}>
          <Button className={style.button} onClick={() => this.handleButtonClick('Go')} variant="contained" color="primary">
            Go!
          </Button>
          <Button className={style.button} onClick={() => this.handleButtonClick('leaderboards')} variant="contained" color="primary">
            High Scores!
        </Button>
        </div>
      </div>
    );
  }
}

export default StartPage;
