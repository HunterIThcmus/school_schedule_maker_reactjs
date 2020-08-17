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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

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
  formControl: {
    margin: theme.spacing(1),
  },
  formGroup: {
    // margin: theme.spacing(2,5),// TRBL
    padding: theme.spacing(1, 6),
  },
}));

export default function Teacher(props) {
  const classes = useStyles();
  const id = new URLSearchParams(props.location.search).get("id");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [teacher_id, setTeacherId] = useState();
  const [period_per_week, setPeriodPerWeek] = useState();
  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [required, setRequired] = useState();
  const [items, setItems] = useState([]);
  const [requiredList, setRequiredList] = useState([]);
  const grades = ["10", "11", "12"];
  const history = useHistory();
  useEffect(() => {
    if (id!=null && id.length > 0) {
      async function getTeacherById() {
        const response = await TeacherReponsitory.getTeacherById(id);
        let body = response.data;
        console.log(body);
        setTeacherId(body.teacher_id);
        setGrade(`${body.grade}`);
        setSubject(body.subject);
        setPeriodPerWeek(body.period_per_week);
        setFirstName(body.name.substring(0, body.name.indexOf(" ")));
        setLastName(
          body.name.substring(body.name.indexOf(" "), body.name.length)
        );
        setRequired(body.require.toString());
      }
      getTeacherById();
    }
    async function getCharacters() {
      const response = await SubjectReponsitory.getAllSubject();
      let body = response.data;
      setItems(body.data);
    }
    getCharacters();

    async function getRequired() {
      const response = await TeacherReponsitory.getRequiredTeacher();
      let body = response.data;
      setRequiredList(body.data);
    }
    getRequired();
  }, []);

  async function handleButton() {
    setRequired(str);
    TeacherReponsitory.create(
      firstName + " " + lastName,
      teacher_id,
      period_per_week,
      grade,
      subject,
      required
    ).then((response) => console.log(response));
    history.push("/teacherlist");
  }

  function back() {
    return history.push("/teacherlist");
  }
  var str = "0000000000";
  function checkRequired(type) {
    str = setCharAt(str, type, str.charAt(type) == "0" ? "1" : "0");
  }
  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
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
                InputLabelProps={{
                  shrink: id!=null && id.length > 0 ? true : false,
                }}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Tên"
                autoComplete="lastname"
                onChange={(e) => setLastName(e.target.value)}
                InputLabelProps={{
                  shrink: id!=null && id.length > 0 ? true : false,
                }}
                value={lastName}
              />
            </Grid>
            {/* {eval(required)} */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="teacher_id"
                label="ID Giáo viên"
                autoComplete="teacher_id"
                onChange={(e) => setTeacherId(e.target.value)}
                InputLabelProps={{
                  shrink: id!=null && id.length > 0 ? true : false,
                }}
                value={teacher_id}
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
                InputLabelProps={{
                  shrink: id!=null &&id.length > 0 ? true : false,
                }}
                value={period_per_week}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  Chọn ràng buộc của giáo viên
                </FormLabel>
                <FormGroup row className={classes.formGroup}>
                  {requiredList.map((element) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => checkRequired(element.type)}
                          // checked={required[element.type] == '1'?true:false}
                          name={element.description}
                        />
                      }
                      label={element.description}
                    />
                  ))}
                </FormGroup>
              </FormControl>
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
                InputLabelProps={{
                  shrink: id!=null && id.length > 0 ? true : false,
                }}
                value={grade}
                key={grade}
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
                InputLabelProps={{
                  shrink: id!=null &&id.length > 0 ? true : false,
                }}
                value={subject}
                key={subject}
              >
                {grade != null
                  ? items.map((option) =>
                      option.grade == grade ? (
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
                {id!=null &&id.length > 0 ? "Cập nhật" : "Tạo giáo viên"}
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
