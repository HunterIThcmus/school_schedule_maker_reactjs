import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import authHeader from "../../../services/AuthHeader";
import Button from "@material-ui/core/Button";


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

export default function Class(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    const [isBusy, setBusy] = useState(true);
    const history = useHistory()

    async function handleButtonDelete(index) {
        try {
            let response = await fetch(
                `https://scheduleapi.herokuapp.com/classes/` + data[index]._id,
                {
                    method: 'DELETE',
                    headers: {
                        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM1NDQzYmIxY2RjNjAwMTdjNTc4YTkiLCJpYXQiOjE1OTczMjY4MTZ9.FjnzhPAwfQB8XPSv9qksKipiYLRyWdPFFmWvzON0OUg",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify()
                }
            )
            // let responseData = response.json;
            // console.log(response);
            let newdata = [...data];
            newdata.splice(index, 1);
            setData(newdata);


        } catch (error) {
            console.log("thow " + error.message);
        }
    }
    async function handleButtonUpdate(index) {
        // history.push("/subject/view/" + data[index]._id + "/" + data[index].name);
        history.push("/classes/" + data[index]._id + "/" + data[index].name);

    }


    const fetchData = async () => {
        // setBusy(true);
        try {
            let response = await fetch(`https://scheduleapi.herokuapp.com/classes`,
                {
                    method: 'GET',
                    headers: authHeader(),
                    body: JSON.stringify()
                }
            )
            console.log(response)
            let responseData = await response.json();
            console.log(responseData)
            setData(responseData.data);
            setBusy(false);
        } catch (error) {
            console.log("thow " + error.message);
        }
    }

    useEffect(() => {
        fetchData()
    }, [props.add])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> DANH SÁCH LỚP  </Typography>
                <div>
                    {isBusy ? (<p>loading...</p>) : (
                        data.map((item, index) => <li key={item.name}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    {item.name}
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="default" onClick={() => handleButtonUpdate(index)}
                                    >Cập nhật </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleButtonDelete(index)}>
                                        Xóa
                                </Button>
                                </Grid>
                            </Grid>

                        </li>))}
                </div>
            </div>
        </Container>
    );
};
