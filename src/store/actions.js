import Reflux from 'reflux';

const QuestionActions = Reflux.createActions([
  'saveUsername',
  'getUsername',
  'saveScore',
  'getScore',
  'saveQuestionTotal',
  'getQuestionTotal'
]);

export default QuestionActions;

