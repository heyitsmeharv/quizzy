import React from 'react';

// styles
import style from './styles.module.scss';


class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoading: true,
      score: 0,
    }
  }

  componentDidMount() {
    // TODO allow the user to customise the quiz but for now, hardcode.
    fetch("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple")
    .then(response => {
      return response.json();
    })
    .then(loadedQuestions => {
      loadedQuestions.results.map((loadedQuestion) => {
        // format the response
        const formattedQuestion = {
          question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
        
        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });
        
        this.setState({
          questions: formattedQuestion
        })
        return formattedQuestion;
      });
    });
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { questions, isLoading, score } = this.state;
    console.log('questions', questions);

    return (
      <div className={style.container}>
        {isLoading ?
          <div>Loading</div> :  
          <>
          <div className={style.score}>Score: {score}</div>
          <div className={style.questions}>
            <h2 className={style.questionTitle}>{questions.question}</h2>
            <div className={style.choiceContainer}>
              <p className={style.choicePrefix}>A</p>
              <label className={style.choiceText}>Choice A</label>
            </div>
            <div className={style.choiceContainer}>
              <p className={style.choicePrefix}>B</p>
              <label className={style.choiceText}>Choice B</label>
            </div>
            <div className={style.choiceContainer}>
              <p className={style.choicePrefix}>C</p>
              <label className={style.choiceText}>Choice C</label>
            </div>
            <div className={style.choiceContainer}>
              <p className={style.choicePrefix}>D</p>
              <label className={style.choiceText}>Choice D</label>
            </div>
          </div>
          </>
        } 
      </div>
    );
  }
}

export default QuestionsPage;
