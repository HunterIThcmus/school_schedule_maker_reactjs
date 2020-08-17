import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import authHeader from "../../../services/AuthHeader";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function Update(props) {
    const classes = useStyles();
    const [Name, setName] = useState(props.match.params.name);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    async function handleButton() {
        await fetch(
            `https://scheduleapi.herokuapp.com/classes/` + props.match.params.class_id,
            {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify({ name: Name})
            }
        ).then(
            (response) => {
                if(response.status>=200 && response.status<=299){
                history.goBack();
                }
                else{
                setOpen(true);
                }
            },
            (error) => {
                setOpen(true);
            }
        );
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cập nhật môn học
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                // autoComplete="Name"
                                variant="outlined"
                                value={Name || ''}
                                required
                                fullWidth
                                id="Name"
                                label="tên môn"
                                // autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleButton()}
                        className={classes.submit}
                    >
                        Cập nhật
          </Button>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error">
                    Tên lớp trống hoặc đã trùng với các lớp hiện tại
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}
