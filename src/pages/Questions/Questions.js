import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';
import QuestionActions from '../../store/actions';

// styles
import style from './styles.module.scss';


class QuestionsPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'username',
      'score',
    ];
    this.state = {
      questions: [],
      questionTotal: 0,
      availableQuestions: [],
      currentQuestion: {},
      questionIndex: null,
      questionCounter: 0,
      acceptingAnswers: true,
      isLoading: true,
      falseAnimation: false,
      correctAnimation: false,
    }
  }

  componentDidMount() {
    // TODO allow the user to customise the quiz but for now, hardcode.
    const URL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";
    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(loadedQuestions => {
        loadedQuestions.results.map((loadedQuestion) => {
          // format the response
          const formattedQuestion = {
            question: loadedQuestion.question.toString().replace(/&quot;/g,'"').replace(/&#039;/g,`'`).replace(/&amp;/g,'&')
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
            availableQuestions: listOfQuestions,
            questions: listOfQuestions,
            questionTotal: listOfQuestions.length,
          }, () => {
            console.log(this.state);
          });
        });
        // this.getNextQuestion(this.state.questions);
        this.start(this.state.availableQuestions);
      }).catch((error) => {
        console.error('failed to get questions', error);
      });
  }

  start = (availableQuestions) => {
    this.setState({
      score: 0,
      questionCounter: 0,
    });
    this.getNextQuestion(availableQuestions);
  }

  getNextQuestion = (availableQuestions) => {
    let { questionCounter } = this.state;
    this.setState({
      questionCounter: questionCounter + 1,
    });

    // find a random question
    this.setState({
      questionIndex: Math.floor(Math.random() * availableQuestions.length),
    }, () => {
      this.setState({
        currentQuestion: availableQuestions[this.state.questionIndex],
      });
    });
  }

  animation = (colour) => {
    if (colour === 'green') {
      this.setState({ correctAnimation: true });
    } else {
      this.setState({ falseAnimation: true });
    }
    
    setTimeout(() => {
      this.setState({ 
        falseAnimation: false,
        correctAnimation: false, 
      });
    }, 500); 
  }

  removeQuestion = () => {
    const { availableQuestions, questionIndex } = this.state;
    const newQuestions = [...availableQuestions];
    newQuestions.splice(questionIndex, 1);
    this.setState({ availableQuestions: newQuestions });
    return newQuestions;
  }

  checkAnswer = (answer) => {
    const { questions, currentQuestion, questionCounter, score } = this.state;
    // have we run out of questions?
    if (questionCounter >= questions.length) {
      QuestionActions.saveScore(score);
      this.props.history.push('/leaderboards');
    } else {
      // remove the current question
      let newQuestions = this.removeQuestion();
      // check to see if correct answer was selected
      // TODO check the question counter
      // TODO when finished, go to the leaderboards screen
      if (answer === currentQuestion.answer) {
        this.setState({ score: this.state.score + 1 });
        this.animation('green');
        this.getNextQuestion(newQuestions);
      } else {
        this.animation('red');
        this.getNextQuestion(newQuestions);
      }
    }
  }

  renderQuestion = (currentQuestion) => {
    if (currentQuestion) {
      return (<>
        <h2 className={style.questionTitle}>{currentQuestion ? currentQuestion.question : ''}</h2>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(1)}>
          <p className={style.choicePrefix}>A</p>
          <label className={style.choiceText}>{currentQuestion ? currentQuestion.choice1 : ''}</label>
        </div>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(2)}>
          <p className={style.choicePrefix}>B</p>
          <label className={style.choiceText}>{currentQuestion ? currentQuestion.choice2 : ''}</label>
        </div>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(3)}>
          <p className={style.choicePrefix}>C</p>
          <label className={style.choiceText}>{currentQuestion ? currentQuestion.choice3 : ''}</label>
        </div>
        <div className={style.choiceContainer} onClick={() => this.checkAnswer(4)}>
          <p className={style.choicePrefix}>D</p>
          <label className={style.choiceText}>{currentQuestion ? currentQuestion.choice4 : ''}</label>
        </div>
      </>)
    } else {
      return <div className={style.tempLoading}>Getting The Question...</div>
    }
  }

  render() {
    const { currentQuestion, score, questionCounter, correctAnimation, falseAnimation } = this.state;
    return (
      <div className={correctAnimation === true ? style.containerCorrect : falseAnimation === true ? style.containerFalse : style.container} >
        <div className={style.topWrapper}>
          <div className={style.progressBar}>Question {questionCounter} / {this.state.questionTotal}</div>
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
