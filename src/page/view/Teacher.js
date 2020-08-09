import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TeacherReponsitory from "../../services/TeacherReponsitory";
import SubjectReponsitory from "../../services/SubjectReponsitory";
import axios from "axios";

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

export default function Teacher() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [teacher_id, setTeacherId] = useState();
  const [period_per_week, setPeriodPerWeek] = useState();
  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();

  const [items, setItem] = useState( [] );

  useEffect(() => {
    const getCharacters = async () => {
      const result = await axios.get(
        `https://scheduleapi.herokuapp.com/subject`,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("user")).token,
          },
        }
      ).then(response => response.data)
      setItem(result)
      console.log(items)
    };
    getCharacters();
  }, []);

  async function handleButton() {
    TeacherReponsitory.create(
      firstName + " " + lastName,
      teacher_id,
      period_per_week,
      grade,
      subject,
    ).then((response) => console.log(response));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí giáo viên
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Họ"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Tên"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="teacher_id"
                label="ID Giáo viên"
                name="teacher_id"
                autoComplete="teacher_id"
                onChange={(e) => setTeacherId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="period_per_week"
                label="Số tiết"
                type="number"
                InputProps={{
                  inputProps: { 
                      max: 30, min: 1 
                  }
              }}
                id="period_per_week"
                autoComplete="period_per_week"
                onChange={(e) => setPeriodPerWeek(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="grade"
                label="Khối"
                id="grade"
                autoComplete="grade"
                onChange={(e) => setGrade(e.target.value)}
              >
                {items.sortName}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="subject"
                label="Môn học"
                id="subject"
                autoComplete="subject"
                onChange={(e) => setSubject(e.target.value)}
              >
                {items.sortName}
              </TextField>
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
            Tạo giáo viên
          </Button>
        
        </form>
      </div>
    </Container>
  );
}
