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
import TeacherReponsitory from "../../services/TeacherReponsitory";
import SubjectReponsitory from "../../services/SubjectReponsitory";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";

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
  const [required, setRequired] = useState();
  const [items, setItems] = useState([]);
  const [requiredList, setrequiredList] = useState([]);
  const grades = ["10", "11", "12"];
  const history = useHistory();

  useEffect(() => {
    async function getCharacters() {
      const response = await SubjectReponsitory.getAllSubject();
      let body = response.data;
      setItems(body.data);
      // console.log(body.data);
      // const response = await SubjectReponsitory.getRequired();
      // let body = response.data;
      // setrequiredList(body.data);
    }
    getCharacters();

    async function getRequired() {
      const response = await TeacherReponsitory.getRequiredTeacher();
      let body = response.data;
      setrequiredList(body.data);
    }
    getRequired();
  }, []);


  async function handleButton() {
    TeacherReponsitory.create(
      firstName + " " + lastName,
      teacher_id,
      period_per_week,
      grade,
      subject,
      required
    ).then((response) => console.log(response));
  }

  function back() {
    history.push("/teacherlist");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí giáo viên{" "}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstname"
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
                autoComplete="teacher_id"
                onChange={(e) => setTeacherId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Số tiết"
                type="number"
                InputProps={{
                  inputProps: {
                    max: 30,
                    min: 1,
                  },
                }}
                id="period_per_week"
                autoComplete="period_per_week"
                onChange={(e) => setPeriodPerWeek(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="required"
                label="Ràng buộc giáo viên"
                select
                type="number"
                autoComplete="required"
                onChange={(e) => setRequired(e.target.value)}
              >
                {requiredList.map((option) => (
                  <MenuItem key={option.type} value={option.description}>
                    {option.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                label="Khối"
                id="grade"
                autoComplete="grade"
                onChange={(e) => setGrade(e.target.value)}
              >
                {grades.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                label="Môn học"
                id="subject"
                autoComplete="subject"
                onChange={(e) => setSubject(e.target.value)}
              >
                {grade != null
                  ? items.map((option) =>
                      option.grade === grade ? (
                        <MenuItem key={option.grade} value={option.sortName}>
                          {option.sortName}
                        </MenuItem>
                      ) : null
                    )
                  : null}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => back()}
                className={classes.submit}
              >
                Trở về
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
