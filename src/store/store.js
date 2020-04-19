import Reflux from 'reflux';
import QuestionActions from './actions';

export default class QuestionStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      username: '',
      score: 0,
      questionTotal: 0,
    };
    this.listenToMany(QuestionActions);
  }

  saveUsername = (username) => {
    this.setState({
      username,
    });
  }

  getUsername = () => {
    return this.state.username;
  }

  saveScore = (score) => {
    this.setState({
      score,
    });
  }

  getScore = () => {
    return this.state.score;
  }

  saveQuestionTotal = (questionTotal) => {
    this.setState({
      questionTotal,
    })
  }

  getQuestionTotal = () => {
    return this.state.questionTotal;
  }

}