import React, { FC } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Box, Typography, Link, SvgIcon, makeStyles, Button, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';

function LightBulbIcon(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
}));

function ProTip() {
  const classes = useStyles();
  return (
    <Typography className={classes.root} color="textSecondary">
      <LightBulbIcon className={classes.lightBulb} />
      Pro tip: Lisätietoja <Link href="https://www.juhannuskonferenssi.fi/talkoisiin/">talkoo sivulta</Link>.
    </Typography>
  );
}

const Footer: FC = () => {
  return (
    <footer>
      <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
        &copy;
        {' '}
        <Link color="inherit" href="https://datacodex.fi/">
          DataCodex
        </Link>
        {' '}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
}


const App: FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tarmo ilmo
      </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Sähköpostiosoite" />
        </form>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        &nbsp;
        <Button variant="contained" color="secondary">
          Hello Web
        </Button>
        <ProTip />
      </Box>
      <Footer />
    </Container>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    //   <div>
    //     <h3>Tarmo ilmo</h3>
    //     <Button variant="contained" color="primary">
    //       Hello World
    //   </Button>
    //   </div>
    //   <footer>
    //     &copy; 2020 DataCodex
    //   </footer>
    // </div>
  );
}

export default App;
