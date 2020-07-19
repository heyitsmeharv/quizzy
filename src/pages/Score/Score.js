import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';

import style from './styles.module.scss';

class ScorePage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'questionLimit',
      'user',
    ];
    this.state = {};
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.scoreContainer}>
          <did className={style.scoreTitle}>Your Score</did>
          <div className={style.score}>
            <div className={style.scoreText}>
              {this.state.user.score}/{this.state.questionLimit}
            </div>
          </div>
          <div className={style.newGameWrapper}>
            <div className={style.newGameText} onClick={() => { this.props.history.push('/questions') }}>Try Again</div>
            <div className={style.newGameText} onClick={() => { this.props.history.push('/leaderboards') }}>Leaderboards</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScorePage;