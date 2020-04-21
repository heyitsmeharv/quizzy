import Reflux from 'reflux';

const QuestionActions = Reflux.createActions([
  'saveUsername',
  'getUsername',
  'saveScore',
  'getScore',
  'saveQuestionTotal',
  'getQuestionTotal',
  'saveCategory',
  'getCategory',
  'saveNumberOfQuestions',
  'getNumberOfQuestions',
  'saveDifficulty',
  'getDifficulty',
  'handleCategoryChange',
  'handleDifficultyChange',
  'saveQuestionLimit',
]);

export default QuestionActions;

