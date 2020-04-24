import Reflux from 'reflux';
import QuestionActions from './actions';

export default class QuestionStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      username: '',
      score: 0,
      questionTotal: 0,
      category: [],
      categorySelected: 9,
      numberOfQuestions: null,
      difficulty: 'medium',
      questionLimit: null,
      questionCounter: 0,
      progress: 0,
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

  saveQuestionLimit = (questionLimit) => {
    this.setState({
      questionLimit,
    })
  }

  saveCategory = (category) => {
    this.setState({
      categorySelected: category,
    });
  }

  getCategory = () => {
    return this.state.categorySelected;
  }

  saveNumberOfQuestions = (number) => {
    this.setState({
      numberOfQuestions: number,
    });
  }

  getNumberOfQuestions = () => {
    return this.state.numberOfQuestions;
  }

  saveDifficulty = (difficulty) => {
    this.setState({
      difficulty,
    });
  }

  getDifficulty = () => {
    return this.state.difficulty;
  }

  handleCategoryChange = (event) => {
    this.setState({
      categorySelected: event.target.value
    });

    fetch(`https://opentdb.com/api_count.php?category=${this.state.categorySelected}`)
      .then(response => {
        console.log(response);
        return response.json();
      }).then(number => {
        this.setState({ numberOfQuestions: number });
      })

    QuestionActions.saveCategory(this.state.categorySelected);
    QuestionActions.saveNumberOfQuestions(this.state.numberOfQuestions);
  };

  handleDifficultyChange = (event) => {
    this.setState({
      difficulty: event.target.value
    });
    QuestionActions.saveDifficulty(this.state.difficulty);
  };


}