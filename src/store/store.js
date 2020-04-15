import Reflux from 'reflux';
import QuestionActions from './actions';

export default class QuestionStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      username: '',
      questions: [],
      availableQuestions: [],
      currentQuestion: {},
      questionIndex: null,
      questionCounter: 0,
    };
    this.listenToMany(QuestionActions);
  }

  saveUsername(username) {
    this.setState({
      username,
    });
  }

  getUsername() {
    return this.state.username;
  }

  getQuestionData() {
    // TODO allow the user to customise the quiz but for now, hardcode.
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
      .then(response => {
        return response.json();
      })
      .then(loadedQuestions => {
        loadedQuestions.results.map((loadedQuestion) => {
          // format the response
          const formattedQuestion = {
            question: loadedQuestion.question
          };

          // assign incorrect and correct answers
          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

          answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

          // add choice label for each choice
          answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
          });

          // put the questions into an array
          let listOfQuestions = [];
          listOfQuestions.push(...this.state.questions, formattedQuestion);

          this.setState({
            questions: listOfQuestions,
          });

        });
      });
  }
}