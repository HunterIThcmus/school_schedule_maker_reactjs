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
import SubjectReponsitory from "../../services/SubjectReponsitory";
import MenuItem from '@material-ui/core/MenuItem';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory, useLocation } from 'react-router-dom';

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
    const [Name, setName] = useState();
    const [ShortName, setShortName] = useState();
    const [Nlession, setNLession] = useState();
    const [open, setOpen] = useState(false);

    const history = useHistory();
    async function handleButton() {
        // console.log("updating subject")
        // let result = await SubjectReponsitory.PutUpdateSubject(
        //     props.match.params.subject_id,
        //     Name,
        //     ShortName,
        //     Nlession
        // );
        // console.log(result.status);
        // //history.goBack();
        await SubjectReponsitory.PutUpdateSubject(
            props.match.params.subject_id,
            Name,
            ShortName,
            Nlession
        ).then(
            () => {
                history.goBack();
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

    useEffect(() => {
        async function getSubject() {

            const response = await SubjectReponsitory.getSubjectById(props.match.params.subject_id);
            console.log(response);
            let body = response.data;
            setName(body.name);
            setShortName(body.sortName);
            setNLession(body.nLesson);
        }
        getSubject();

    }, []);

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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                value={ShortName || ''}
                                required
                                fullWidth
                                id="ShortName"
                                label="Tên rút gọn"
                                autoComplete="lname"
                                onChange={(e) => setShortName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={Nlession || ''}
                                label="Số tiết"
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        max: 5, min: 1
                                    }
                                }}
                                id="period_per_week"
                                autoComplete="period_per_week"
                                onChange={(e) => setNLession(e.target.value)}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="required"
                label="Ràng buộc giáo viên"
                select
                type="number"
                id="required"
                autoComplete="required"
                onChange={(e) => setRequired(e.target.value)}
              />
            </Grid> */}
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
                        Cập nhật thất bại
                  </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}
