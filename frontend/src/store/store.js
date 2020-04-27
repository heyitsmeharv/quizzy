import Reflux from 'reflux';
import QuestionActions from './actions';

export default class QuestionStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      user: {
        user: '',
        score: 0,
        time: '',
        total: 0,
      },
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
    let newUser = this.state.user;
    newUser.user = username;
    this.setState({
      user: newUser,
    });
  }

  saveScore = (score) => {
    let newUser = this.state.user;
    newUser.score = score;
    this.setState({
      user: newUser,
    });
  }

  saveQuestionLimit = (questionLimit) => {
    this.setState({
      questionLimit,
    });
    let newUser = this.state.user;
    newUser.total = questionLimit;
    this.setState({
      user: newUser,
    });
  }

  saveCategory = (category) => {
    this.setState({
      categorySelected: category,
    });
  }

  saveNumberOfQuestions = (number) => {
    this.setState({
      numberOfQuestions: number,
    });
  }

  saveDifficulty = (difficulty) => {
    this.setState({
      difficulty,
    });
  }

  handleCategoryChange = (event) => {
    this.setState({
      categorySelected: event.target.value
    });

    fetch(`https://opentdb.com/api_count.php?category=${this.state.categorySelected}`)
      .then(response => {
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