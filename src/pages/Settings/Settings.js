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

// styles
import style from './styles.module.scss';

class SettingsPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'category',
      'difficulty',
      'categorySelected',
      'numberOfQuestions',
    ];
    this.state = {}
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

  render() {
    const { category, categorySelected, difficulty } = this.state;

    return (
      <div className={style.container}>
        <FormControl className={style.dropdown} variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            disabled
            value={categorySelected}
            onChange={QuestionActions.handleCategoryChange}
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
            disabled
            value={difficulty}
            onChange={QuestionActions.handleDifficultyChange}
            label="Difficulty"
          >
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <div className={style.buttonWrapper}>
          <Button className={style.button} onClick={() => this.handleButtonClick()} variant="contained" color="primary">
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
