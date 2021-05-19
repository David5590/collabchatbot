import { React, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AuthContext } from "../providers/authProvider";

const useStyles = makeStyles((theme) => ({
    loginButton: {
        padding: "10px",
        borderRadius: "10px",
    }
}));

export const LoginButton = () => {
    const classes = useStyles();
    const { isAuthenticated, logout, signinRedirect } = useContext(AuthContext)
    if (isAuthenticated()) {
        return <Button
            className={classes.loginButton}
            onClick={() => { logout() }}
            color="inherit">Logout</Button>
    } else {
        return <Button
            className={classes.loginButton}
            onClick={() => { signinRedirect(); }}
            color="inherit">Login with twitch</Button>
    };
};