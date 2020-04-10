import React from 'react';

// components
import Button from '@material-ui/core/Button';
import Header from './components/Header/Header.js';
import TextField from '@material-ui/core/TextField';

// styles
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import style from './styles.module.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Luckiest Guy',
    ].join(','),
  },
  palette: {
    primary: blue,
  },
  status: {
    danger: 'orange',
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className={style.container}>
        <Header text="QUIZZY" />
        <div className={style.textFieldWrapper}>
          <p className={style.text}>Please Enter Your Player Name:</p>
          <TextField
            id="standard-uncontrolled"
            label="Player Name"
            variant="outlined"
          />
        </div>
        <Button className={style.goButton} variant="contained" color="primary">
          Go!
        </Button>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
