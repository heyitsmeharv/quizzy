import Reflux from 'reflux';
import QuestionActions from './actions';

export default class QuestionStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      score: 0,
      profile: {
        username: '',
        score: [],
      }
    };
    this.listenToMany(QuestionActions);
  }

  saveUsername = (username) => {
    this.setState({
      username,
    });
  }

  getUsername = () => {
    return this.state.profile.username;
  }

  saveScore = (score) => {
    this.setState({
      score,
    });
  }

  getScore = () => {
    return this.state.profile.score;
  }

  // setUp = (URL) => {
  //   return fetch(URL)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(loadedQuestions => {
  //       loadedQuestions.results.map((loadedQuestion) => {
  //         // format the response
  //         const formattedQuestion = {
  //           question: loadedQuestion.question
  //         };

  //         // assign incorrect and correct answers
  //         const answerChoices = [...loadedQuestion.incorrect_answers];
  //         formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

  //         answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

  //         // add choice label for each choice
  //         answerChoices.forEach((choice, index) => {
  //           formattedQuestion["choice" + (index + 1)] = choice;
  //         });

  //         // put the questions into an array
  //         let listOfQuestions = [];
  //         listOfQuestions.push(...this.state.questions, formattedQuestion);

  //         this.setState({
  //           score: 0,
  //           questionCounter: 0,
  //           availableQuestions: listOfQuestions,
  //           questions: listOfQuestions,
  //           questionTotal: listOfQuestions.length,
  //         });
  //       });
  //       this.getNextQuestion(this.state.questions);
  //     }).catch((error) => {
  //       console.error('failed to get questions', error);
  //     });
  // }

  // getNextQuestion = (availableQuestions) => {
  //   let { questionCounter } = this.state;
  //   this.setState({
  //     questionCounter: questionCounter + 1,
  //   });

  //   // find a random question
  //   this.setState({
  //     questionIndex: Math.floor(Math.random() * availableQuestions.length),
  //   })
  //   this.setState({
  //     currentQuestion: availableQuestions[this.state.questionIndex],
  //   });
  // }

  // removeQuestion = () => {
  //   const { availableQuestions, questionIndex } = this.state;
  //   const newQuestions = [...availableQuestions];
  //   newQuestions.splice(questionIndex, 1);
  //   this.setState({ availableQuestions: newQuestions });
  // }

  // checkAnswer = (answer) => {
  //   const { questions, currentQuestion, questionCounter, availableQuestions, score } = this.state;

  //   // have we run out of questions?
  //   if (questionCounter >= questions.length) {
  //   // if (availableQuestions.length === 0) {
  //     this.saveScore(score);
  //     this.props.history.push('/leaderboards');
  //   } else {
  //     // check to see if correct answer was selected
  //     // TODO check the question counter
  //     // TODO when finished, go to the leaderboards screen
  //     if (answer === currentQuestion.answer) {
  //       this.setState({
  //         score: this.state.score + 1,
  //       });
  //       // apply fancy css
  //       this.setState({
  //         isCorrect: true,
  //       });
  //       // remove the current question
  //       this.removeQuestion();
  //       this.getNextQuestion(this.state.availableQuestions);
  //     } else {
  //       // apply false css
  //       this.setState({
  //         isCorrect: false,
  //       });
  //       // remove the current question
  //       this.removeQuestion();
  //       this.getNextQuestion(this.state.availableQuestions);
  //     }
  //   }
  // }

}