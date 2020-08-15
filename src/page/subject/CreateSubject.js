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
import { useHistory ,useLocation} from 'react-router-dom';



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


export default function Add(props) {
    const classes = useStyles();
    const [Name, setName] = useState();
    const [ShortName, setShortName] = useState();
    const [Nlession, setNLession] = useState();
    const history = useHistory();
    async function handleButton() {
        console.log("ok")
        let result = await SubjectReponsitory.postCreateSubject(
            props.match.params.class_id,
            Name,
            ShortName,
            Nlession
        );
        console.log(result.status);
        history.goBack();

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    THÊM MÔM MỚI
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="tên môn"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
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
                        Tạo môn học
          </Button>
                </form>
            </div>
        </Container>
    );
}
