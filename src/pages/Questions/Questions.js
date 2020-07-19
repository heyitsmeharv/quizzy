import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';
import QuestionActions from '../../store/actions';

// components
import ProgressBar from '../../components/ProgressBar/ProgressBar';

// loaders
import PropagateLoader from "react-spinners/PropagateLoader";

// styles
import style from './styles.module.scss';


class QuestionsPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'user',
      'username',
      'categorySelected',
      'numberOfQuestions',
      'difficulty',
      'questionCounter',
      'progress',
    ];
    this.state = {
      questions: [],
      availableQuestions: [],
      currentQuestion: {},
      questionIndex: null,
      acceptingAnswers: true,
      isLoading: true,
      falseAnimation: false,
      correctAnimation: false,
      questionLimit: 0,
    }
  }

  componentDidMount() {
    fetch(`https://opentdb.com/api_count.php?category=${this.state.categorySelected}`)
      .then(response => {
        return response.json();
      }).then(number => {
        this.setState({ numberOfQuestions: number });

        let questionLimit = (this.state.difficulty === 'easy') ? (this.state.numberOfQuestions.category_question_count.total_easy_question_count)
          : ((this.state.difficulty === 'medium') ? (this.state.numberOfQuestions.category_question_count.total_medium_question_count)
            : (this.state.numberOfQuestions.category_question_count.total_hard_question_count));

        // 25 questions maximum!
        if (questionLimit >= 25) {
          questionLimit = 25;
        } else if (questionLimit <= 25 && questionLimit >= 20) {
          questionLimit = 20;
        } else if (questionLimit <= 20 && questionLimit >= 15) {
          questionLimit = 15;
        } else if (questionLimit <= 15 && questionLimit >= 10) {
          questionLimit = 10;
        } else {
          questionLimit = 5;
        }

        this.setState({
          questionLimit
        }, () => {
          QuestionActions.saveQuestionLimit(questionLimit);
        });

        const URL = `https://opentdb.com/api.php?amount=${this.state.questionLimit}&category=${this.state.categorySelected}&difficulty=${this.state.difficulty}&type=multiple`;
        fetch(URL)
          .then(response => {
            return response.json();
          })
          .then(loadedQuestions => {
            loadedQuestions.results.map((loadedQuestion) => {
              // format the response
              const formattedQuestion = {
                question: loadedQuestion.question.toString().replace(/&quot;/g, '"').replace(/&#039;/g, `'`).replace(/&amp;/g, '&').replace(/&Ouml;/g, 'ö').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å'),
                correct_answer: loadedQuestion.correct_answer.toString().replace(/&quot;/g, '"').replace(/&#039;/g, `'`).replace(/&amp;/g, '&').replace(/&Ouml;/g, 'ö').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å'),
                incorrect_answer1: loadedQuestion.incorrect_answers[0].toString().replace(/&quot;/g, '"').replace(/&#039;/g, `'`).replace(/&amp;/g, '&').replace(/&Ouml;/g, 'ö').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å'),
                incorrect_answer2: loadedQuestion.incorrect_answers[1].toString().replace(/&quot;/g, '"').replace(/&#039;/g, `'`).replace(/&amp;/g, '&').replace(/&Ouml;/g, 'ö').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å'),
                incorrect_answer3: loadedQuestion.incorrect_answers[2].toString().replace(/&quot;/g, '"').replace(/&#039;/g, `'`).replace(/&amp;/g, '&').replace(/&Ouml;/g, 'ö').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å'),
              };

              const newIncorrectAnswers = [formattedQuestion.incorrect_answer1, formattedQuestion.incorrect_answer2, formattedQuestion.incorrect_answer3];

              // assign incorrect and correct answers
              const answerChoices = [...newIncorrectAnswers];
              formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

              answerChoices.splice(formattedQuestion.answer - 1, 0, formattedQuestion.correct_answer);

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
                // questionTotal: listOfQuestions.length,
              }, () => {
                // console.log(this.state);
              });

              // QuestionActions.saveQuestionTotal(this.state.questionTotal);

            });
            // this.getNextQuestion(this.state.questions);
            setTimeout(() => {
              this.setState({ isLoading: false })
            }, 1000);
            this.start(this.state.availableQuestions);
          }).catch((error) => {
            console.error('failed to get questions', error);
          });

      });
  }

  start = (availableQuestions) => {
    let newUser = this.state.user;
    newUser.score = 0;
    this.setState({
      user: newUser,
      questionCounter: 0,
      progress: 0,
    });
    this.getNextQuestion(availableQuestions);
  }

  getNextQuestion = (availableQuestions) => {
    let { questionCounter, progress } = this.state;
    this.setState({
      questionCounter: questionCounter + 1,
      progress: progress + 4, // increase based on total questions 100 / 25 = 4
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
    const { questionLimit, currentQuestion, questionCounter, user } = this.state;
    // have we run out of questions?
    if (questionCounter >= questionLimit) {
      QuestionActions.saveScore(user.score);
      fetch('https://backend-quizzy.herokuapp.com/users/add', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(user)
      })
      .catch(error => {
        console.log(`Unable to submit score: ${error}`)
      })
      // this.props.history.push('/score');
    } else {
      // remove the current question
      let newQuestions = this.removeQuestion();
      // check to see if correct answer was selected
      if (answer === currentQuestion.answer) {
        // this.setState({ score: this.state.score + 1 });
        let newUser = this.state.user;
        newUser.score = user.score + 1;
        this.setState({
          user: newUser,
        });
        this.animation('green');
        this.getNextQuestion(newQuestions);
      } else {
        this.animation('red');
        this.getNextQuestion(newQuestions);
      }
    }
  }

  renderQuestion = (currentQuestion) => {
    if (currentQuestion && this.state.isLoading === false) {
      return (
        <div className={style.choiceWrapper}>
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
        </div>
      )
    } else {
      // return <div className={style.tempLoading}>Getting The Question...</div>
      return (
        <div className={style.loaderContainer}>
          <div><PropagateLoader /></div>
        </div>)
    }
  }

  render() {
    const { currentQuestion, questionCounter, correctAnimation, falseAnimation, progress, user } = this.state;
    return (
      <div className={correctAnimation === true ? style.containerCorrect : falseAnimation === true ? style.containerFalse : style.container} >
        <div className={style.topWrapper}>
          <div className={style.progress}>
            Question {questionCounter} / {this.state.questionLimit}
            <ProgressBar percentage={progress} />
          </div>
          <div className={style.score}>Score: {user.score}</div>
        </div>
        <div className={style.questions}>
          {this.renderQuestion(currentQuestion)}
        </div>
      </div>
    );
  }
}

export default QuestionsPage;
