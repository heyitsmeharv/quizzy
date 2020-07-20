import React from 'react';
import Reflux from 'reflux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles.module.scss';

// icons
import ArrowBack from '@material-ui/icons/ArrowBack';

// loaders
import PropagateLoader from "react-spinners/PropagateLoader";

class LeaderBoardPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://backend-quizzy.herokuapp.com/users/')
    .then(response => {
      return response.json();
    }).then(leaderboard => {
      leaderboard.sort((a, b) => b.score - a.score);
      this.setState({ 
        leaderboard,
        isLoading: false, 
      });
    })
    .catch(error => {
      console.log(`Unable to get leaderboards: ${error}`)
    })
  }

  handleButtonClick = () => {
    this.props.history.push('/quizzy');
  };


  // -------------------------------------------------------------------------------
  render() {
    const {
      leaderboard,
      isLoading,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.backButtonWrapper} onClick={() => this.handleButtonClick()} >
          <ArrowBack/>
        </div>
        {!isLoading ?        
        <div className={styles.leaderboardtable}>
          {leaderboard && leaderboard.length > 0 &&
            <Paper>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow className={styles.tableRow}>
                    <TableCell align="center">Player Name</TableCell>
                    <TableCell align="left">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((attempt, key) => {
                    return (
                      <TableRow className={styles.tableRow} key={key}>
                        <TableCell align="center">{attempt.username}</TableCell>
                        <TableCell align="left">{attempt.score}/{attempt.total}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          }
        </div>
          : <div className={styles.loaderContainer}>
          <div><PropagateLoader /></div>
        </div>}
      </div>
    );
  }
}

export default LeaderBoardPage;