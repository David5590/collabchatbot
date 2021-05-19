import { React, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from "../providers/authProvider";
import { LoginButton } from "./loginButton";

const dummyUser = {
  preferred_username: "Waiting for user data",
  picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/150px-User_icon_2.svg.png"
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  root: {
    padding: "10px",
    justifyContent: "center"
  },
  text: {
      fontFamily: "Roboto",
      bottom: "10px",       
      padding: "10px",
      borderRadius: "10px",
  },
  img: {
      height: "50px",
      borderRadius: "50%",
  }
}));

export function MainPage() {
  const classes = useStyles();
  const [user, setUser] = useState(dummyUser);
  const { isAuthenticated, getUser } = useContext(AuthContext)
  useEffect(() => {
      if (isAuthenticated()) {
      async function awaitUser() {
        const user = await getUser()
        setUser(user.profile)
      }
      awaitUser();
    }
    }, [getUser, isAuthenticated])
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Collab Chat Bot
        </Typography>
        {isAuthenticated() && <img className={classes.img} src={user.picture} alt={user.preferred_username}/>}
        {isAuthenticated() && <Typography variant="h7" className={classes.text}>{user.preferred_username}</Typography> }
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
}

