import Reflux from 'reflux';

const QuestionActions = Reflux.createActions([
  'saveUsername',
  'saveScore',
  'saveQuestionTotal',
  'saveCategory',
  'saveNumberOfQuestions',
  'saveDifficulty',
  'handleCategoryChange',
  'handleDifficultyChange',
  'saveQuestionLimit',
]);

export default QuestionActions;

