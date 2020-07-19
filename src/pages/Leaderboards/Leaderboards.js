import React from 'react';
import Reflux from 'reflux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles.module.scss';

class LeaderBoardPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    };
  }

  componentDidMount() {
    fetch('https://backend-quizzy.herokuapp.com/users/')
    .then(response => {
      return response.json();
    }).then(leaderboard => {
      this.setState({ leaderboard })
    })
    .catch(error => {
      console.log(`Unable to get leaderboards: ${error}`)
    })
  }


  // -------------------------------------------------------------------------------
  render() {
    const {
      leaderboard,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.leaderboardtable}>
          {leaderboard && leaderboard.length > 0 ?
            <Paper>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow className={styles.tableRow}>
                    <TableCell>Player Name</TableCell>
                    <TableCell numeric>Score</TableCell>
                    <TableCell numeric>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map(attempt => {
                    return (
                      <TableRow className={styles.tableRow} key={attempt.id}>
                        <TableCell >{attempt.username}</TableCell>
                        <TableCell numeric>{attempt.score}/{attempt.total}</TableCell>
                        <TableCell numeric>{attempt.time}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            : <div className={styles.failure}>Failed to get Leaderboards</div>
          }
        </div>
      </div>
    );
  }
}

export default LeaderBoardPage;