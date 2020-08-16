import React, { useState } from 'react';
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

import authHeader from "../../../services/AuthHeader";


// const onFinish = values => {
//     console.log('Vui lòng nhập đầy đủ thông tin.', values);
// }
// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//         </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

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

const value = [{ title: '10', value: 10 }, { title: '11', value: 11 }, { title: '12', value: 12 },];

export default function Class(props) {
    const classes = useStyles();
    const [grade, setGrade] = React.useState(value[0]);
    const [number, setNumber] = useState('');
    async function handleButton(e) {
         e.preventDefault();
         props.change("false");
        try {
            await fetch(
                `https://scheduleapi.herokuapp.com/classes`,
                {
                    method: 'POST',
                    headers: authHeader(),
                    // {
                    // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM1NGY5YmIxY2RjNjAwMTdjNTc5NDMiLCJpYXQiOjE1OTczMjkzMjZ9.BYL2jMXICTLgfJaEUzlgnCvcOsl8P9ZX7R2oF6hb7k4",
                    //     // "auth-token":authHeader(),
                    //     "Content-Type": "application/json",
                    // },
                    body: JSON.stringify({ number: number, grade: grade })
                }
            ).then(response => console.log(response.json()))
        } catch (error) {
            console.log("thow " + error.message);
        }
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4"> THÊM LỚP </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} xm={6} >
                            <Autocomplete
                                id="grade"
                                options={value}
                                getOptionLabel={(option) => option.title}
                                fullWidth
                                onChange={(event, newValue) => {
                                    setGrade(newValue.value)
                                }}
                                renderInput={(params) => <TextField {...params} name="grade" label="Chọn khối" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} xm={6}>
                            <TextField
                                autoComplete="fname"
                                name="nameclass"
                                variant="outlined"
                                required
                                fullWidth
                                id="nameclass"
                                label="Nhập số lượng lớp"
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} xm={6}>
                    <Button
                        type="submit"
                        width="120"
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleButton(e)}
                        className={classes.submit}
                    >
                        Thêm mới
                     </Button>
                     </Grid>
                </form>
            </div>

        </Container>
    );
};
