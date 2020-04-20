import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';
import QuestionActions from '../../store/actions';

// components
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// icons

// styles
import style from './styles.module.scss';

class SettingsPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'category',
      'difficulty',
      'numberOfQuestions',
    ];
    this.state = {
      category: [],
      categorySelected: '',
      numberOfQuestions: '',
      difficulty: 'Medium',
    }
  }

  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then(response => {
        return response.json();
      }).then(list => {
        this.setState({ category: list });
      })
  }

  handleButtonClick = () => {
    this.props.history.push('/quizzy');
  };

  handleCategoryChange = (event) => {
    this.setState({
      categorySelected: event.target.value
    }, () => {
      fetch(`https://opentdb.com/api_count.php?category=${this.state.categorySelected}`)
        .then(response => {
          console.log(response);
          return response.json();
        }).then(number => {
          this.setState({ numberOfQuestions: number });
        })
    });
  };

  handleDifficultyChange = (event) => {
    this.setState({
      difficulty: event.target.value
    }, () => {
      // if (this.state.categorySelected !== '') {
      //   fetch(`https://opentdb.com/api_count.php?category=${this.state.categorySelected}`)
      //     .then(response => {
      //       console.log(response);
      //       return response.json();
      //     }).then(number => {
      //       this.setState({ numberOfQuestions: number });
      //     })
      // }
    });
  };

  handleNumberChange = (event) => {
    this.setState({
      numberOfQuestions: event.target.value
    });
  };

  handleOnQuestionCount = numberOfQuestions => event => {
    this.setState({
      [numberOfQuestions]: event.target.value,
    });
  };

  render() {
    const { category, categorySelected, numberOfQuestions, difficulty } = this.state;
    console.log('numberOfQuestions', numberOfQuestions);

    // let questionLimit = numberOfQuestions ? (difficulty === 'easy') ? (numberOfQuestions.category_question_count.total_easy_question_count)
    //   : ((difficulty === 'medium') ? (numberOfQuestions.category_question_count.total_medium_question_count)
    //     : (numberOfQuestions.category_question_count.total_hard_question_count)) : '';

    return (
      <div className={style.container}>
        <FormControl className={style.dropdown} variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            value={categorySelected}
            onChange={this.handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {category.trivia_categories &&
              category.trivia_categories.map(value => {
                return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl className={style.dropdown} variant="outlined">
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            onChange={this.handleDifficultyChange}
            label="Difficulty"
          >
            <MenuItem value={'Easy'}>Easy</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'Hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <div className={style.dropdown}>
          <TextField id="standard-uncontrolled" onChange={() => this.handleOnQuestionCount('numberOfQuestions')} label="Number Of Questions" variant="outlined" />
          <p className={style.text}>Number of easy questions: {numberOfQuestions ? numberOfQuestions.category_question_count.total_easy_question_count : ''}</p>
          <p className={style.text}>Number of medium questions: {numberOfQuestions ? numberOfQuestions.category_question_count.total_medium_question_count : ''}</p>
          <p className={style.text}>Number of hard questions: {numberOfQuestions ? numberOfQuestions.category_question_count.total_hard_question_count : ''}</p>
        </div>
        <div className={style.buttonWrapper}>
          <Button className={style.button} onClick={() => this.handleButtonClick()} variant="contained" color="primary">
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
