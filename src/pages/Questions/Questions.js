import React from 'react';

// styles
import style from './styles.module.scss';


class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      availableQuestions: [],
      currentQuestion: {},
      questionIndex: null,
      questionCounter: 0,
      acceptingAnswers: true,
      isLoading: true,
      isCorrect: false,
      score: 0,
    }
  }

  componentDidMount() {
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

          this.start();
        });
      });
  }

  start = () => {
    const { questions, availableQuestions } = this.state;
    this.setState({
      score: 0,
      questionCounter: 0,
      availableQuestions: questions,
    });
    this.getNextQuestion(availableQuestions);
  }

  getNextQuestion = (availableQuestions) => {
    let { questionCounter } = this.state;
    this.setState({
      questionCounter: questionCounter + 1,
    });

    // find a random question
    let questionIndex = Math.floor(Math.random() * availableQuestions.length);
    this.setState({
      currentQuestion: availableQuestions[questionIndex],
      questionIndex,
    });
  }

  removeQuestion = () => {
    const { availableQuestions, questionIndex } = this.state;
    const newQuestions = [...availableQuestions];
    newQuestions.splice(questionIndex, 1);
    this.setState({ availableQuestions: newQuestions });
  }

  checkAnswer = (answer) => {
    const { questions, currentQuestion, questionCounter } = this.state;

    // remove the current question
    this.removeQuestion();

    // have we run out of questions?
    if (questionCounter >= questions.length) {
      this.props.history.push('/leaderboards');
    } else {
      // check to see if correct answer was selected
      // TODO check the question counter
      // TODO when finished, go to the leaderboards screen
      if (answer === currentQuestion.answer) {
        this.setState({
          score: this.state.score + 1,
        });
        // apply fancy css
        this.setState({
          isCorrect: true,
        });
        this.getNextQuestion(this.state.availableQuestions);
      } else {
        // apply false css
        this.setState({
          isCorrect: false,
        });
        this.getNextQuestion(this.state.availableQuestions);
      }
    }
  }

  renderQuestion = (currentQuestion) => {
    if (currentQuestion === undefined) {
      // TODO Add a better loading screen or spinner?
      return <div className={style.tempLoading}>Getting The Question</div>
    } else {
      return (<>
        <h2 className={style.questionTitle}>{currentQuestion.question}</h2>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(1)}>
          <p className={style.choicePrefix}>A</p>
          <label className={style.choiceText}>{currentQuestion.choice1}</label>
        </div>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(2)}>
          <p className={style.choicePrefix}>B</p>
          <label className={style.choiceText}>{currentQuestion.choice2}</label>
        </div>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(3)}>
          <p className={style.choicePrefix}>C</p>
          <label className={style.choiceText}>{currentQuestion.choice3}</label>
        </div>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(4)}>
          <p className={style.choicePrefix}>D</p>
          <label className={style.choiceText}>{currentQuestion.choice4}</label>
        </div>
      </>)
    }
  }

  render() {
    const { currentQuestion, score, questions, questionCounter } = this.state;
    let questionTotal = questions.length;

    return (
      <div className={style.container}>
        <div className={style.topWrapper}>
          <div className={style.progressBar}>Question {questionCounter} / {questionTotal}</div>
          <div className={style.score}>Score: {score}</div>
        </div>
        <div className={style.questions}>
          {this.renderQuestion(currentQuestion)}
        </div>
      </div>
    );
  }
}

export default QuestionsPage;
