import React, { useState, useEffect } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Class() {
    const classes = useStyles();
    const [data, setData] = useState();
    const data1 = [{ "name": "test1" }, { "name": "test2" }];
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        console.log("test function");
        async function fetchData() {
            // setBusy(true);
            try {
                let response = await fetch(
                    `https://scheduleapi.herokuapp.com/class`,
                    {
                        method: 'GET',
                        headers: {
                            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjI2NzhjYWVjYjM1NDAwMTdmNTIyNDYiLCJpYXQiOjE1OTY4MTgyNTJ9.iOWOk8AvPmbRkCLy4TS0kYXDpnx94BQIzcRYX_wM5G8",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify()
                    }
                )
                let responseData = await response.json();
                await setData(responseData.data);
                await setBusy(false);
                await  console.log(data);
                console.log(responseData.data);
            } catch (error) {
                console.log("thow " + error.message);
            }
        }
        fetchData()
    }, [])

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Danh sách lớp  </Typography>
                <div>
            {isBusy ? (<p></p>) : (
               data.map((item, index) => <li key={item.name}>{item.name}</li>) )}
                </div>
            </div>
        </Container>
    );
};
