import React, { useState, useEffect } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory ,useLocation} from 'react-router-dom';
import authHeader from "../../services/AuthHeader";

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

export default function Subject(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    const [isBusy, setBusy] = useState(true);
    const history = useHistory();
    let location = useLocation();

    async function handleButtonDetele(index) {
        try {
            let response = await fetch(
                `https://scheduleapi.herokuapp.com/subjects/` + data[index]._id,
                {
                    method: 'DELETE',
                    headers: authHeader(),
                    body: JSON.stringify()
                }
            )
            let responseData = await response.json();
            let newdata = [...data];
            newdata.splice(index, 1);
            setData(newdata);
            console.log(responseData);
        } catch (error) {
            console.log("thow " + error.message);
        }


    }
    async function handleButtonUpdate(index) {
        try {
            let response = await fetch(
                `https://scheduleapi.herokuapp.com/subjects/` + data[index]._id,
                {
                    method: 'DELETE',
                    headers: authHeader(),
                    body: JSON.stringify()
                }
            )
            let responseData = await response.json();
            let newdata = [...data];
            newdata.splice(index, 1);
            setData(newdata);
            console.log(responseData);
        } catch (error) {
            console.log("thow " + error.message);
        }
    }
    function handleButtonAdd(){
        history.push("/subject/add/"+props.match.params.class_id);
    }




    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch(
                    `https://scheduleapi.herokuapp.com/subjects/byclass/` + props.match.params.class_id,
                    {
                        method: 'GET',
                        headers: authHeader(),
                        body: JSON.stringify()
                    }
                )
                let responseData = await response.json();
                await setData(responseData.data);
                setBusy(false);
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
            {/* {props.match.params.name} */}
                <Typography component="h1" variant="h5"> DANH SÁCH MÔN CỦA LỚP </Typography>
                <div>
                    <div>
                        <Button
                            width="120"
                            variant="contained"
                            color="primary"
                            onClick={() => handleButtonAdd()}>
                            Thêm môn +
                            </Button>
                    </div>
                    {isBusy ? (<p></p>) : (
                        //             data.map((item, index) => <li key={item.name}>{item.name}
                        //                <button onClick={() => handleButtonDetele(index)}>
                        //                     Delete
                        // </button>
                        //             </li>))} data.map((item, index) => <li key={item.name}>
                        data.map((item, index) => <li key={item.name}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    {item.name}
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="default" onClick={() => handleButtonUpdate(index)}
                                    >Update</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleButtonDetele(index)}>
                                        Delete
                            </Button>
                                </Grid>
                            </Grid>

                        </li>))}

                </div>
            </div>
        </Container>
    );
};
