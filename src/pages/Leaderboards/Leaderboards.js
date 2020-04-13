import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowIcon from '@material-ui/icons/ArrowLeftRounded'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import style from './styles.module.scss';

class LeaderBoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  // -------------------------------------------------------------------------------
  render() {
    const {
      question, // to check if got here through the journey
      leaderboard,
    } = this.state;

    return (
      <div className={style.leaderboardpage}>
        <div className={style.addquestionwrapper}>
          <Fab color="primary" onClick={() => this.handleOnSubmitQuestion()} aria-label="Add" className={style.addQuestionButton}>
            <AddIcon />
          </Fab>
          <div className={style.addquestiontext}><ArrowIcon />Submit a quesion! (TODO)</div>
        </div>
        <div className={style.newgamewrapper}>
          <div className={style.newgametext} onClick={() => {this.props.history.push('/questions')}}>New Game</div>
        </div>
        <div className={style.leaderboardtable}>
          {/* {leaderboard && leaderboard.length > 0 && */}
          <Paper>
            <Table>
              <TableHead className={style.tableHead}>
                <TableRow className={style.tableRow}>
                  <TableCell>Player Name</TableCell>
                  <TableCell numeric>Score</TableCell>
                  <TableCell numeric>Average Seconds</TableCell>
                  <TableCell numeric>Total</TableCell>
                  <TableCell numeric>Correct (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {leaderboard.map(attempt => {
                    return (
                      <TableRow className={style.tableRow} key={attempt.id}>
                        <TableCell >{attempt.UserName}</TableCell>
                        <TableCell numeric>{attempt.Score}</TableCell>
                        <TableCell numeric>{attempt.AverageSeconds}</TableCell>
                        <TableCell numeric>{attempt.Total}</TableCell>
                        <TableCell numeric>{attempt.Correct}</TableCell>
                      </TableRow>
                    );
                  })} */}
              </TableBody>
            </Table>
          </Paper>
          {/* } */}
        </div>
      </div>
    );
  }
}

export default LeaderBoardPage;