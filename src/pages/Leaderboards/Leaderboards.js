import React from 'react';
import Reflux from 'reflux';

import QuestionStore from '../../store/store';
import QuestionActions from '../../store/actions';

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

class LeaderBoardPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [QuestionStore];
    this.storeKeys = [
      'profile',
    ];
    this.state = {};
  }

  render() {
    const {
      profile
    } = this.state;

    return (
      <div className={style.container}>
        <div className={style.newGameWrapper}>
          <div className={style.newGameText} onClick={() => { this.props.history.push('/questions') }}>New Game</div>
        </div>
        <div className={style.leaderboardTable}>
          {/* {profile && */}
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
                {/* {profile.score.map(attempt => {
                    return (
                      <TableRow className={style.tableRow} key={attempt.id}>
                        <TableCell >{profile.username}</TableCell>
                        <TableCell numeric>{attempt.score}</TableCell>
                        <TableCell numeric>{attempt.AverageSeconds}</TableCell>
                        <TableCell numeric>{attempt.Total}</TableCell>
                        <TableCell numeric>{attempt.Correct}</TableCell> 
                      </TableRow>
                    );
                  })} */}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default LeaderBoardPage;