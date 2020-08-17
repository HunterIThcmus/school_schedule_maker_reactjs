import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ScheduleReponsitory from "../../services/ScheduleReponsitory";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [item, setItems] = React.useState({
        column: [[]],
    });
    const [classList, setClassList] = useState([]);
    const [state, setState] = React.useState({
        columns: [
            { title: "Ngày", field: "day" },
            { title: "Tiết 1", field: "1" },
            { title: "Tiết 2", field: "2" },
            { title: "Tiết 3", field: "3" },
            { title: "Tiết 4", field: "4" },
            { title: "Tiết 5", field: "5" },
        ],
    });

    const [titleClass, setTitleClass] = useState();
    const [open, setOpen] = useState(false);
    const [errorm, setErrorm] = useState('');
    var listclass = [];
    useEffect(() => {
        async function schedule() {
            let body = "";
            //   const response = 
            await ScheduleReponsitory.getSchedule().then(res => body = res.data)
                .catch(err => {
                    setOpen(true);
                    setErrorm(err.response.data.message);
                });
        if (body != "") {
                //   console.log(response.status)

                //  let body = response.data;
                //  let body=[[1,24]]
                setClassList(body[0])
                console.log(body[0])
                for (let index = 1; index < body.length; index++) {
                    for (let index2 = 0; index2 < body[index].length; index2++) {
                        var value =
                            body[index][index2].subject + " - " + body[index][index2].teacher;
                        if (index === 1) {
                            listclass.push([value]);
                        } else {
                            listclass[index2].push(value);
                        }
                    }
                }
                //convert each class to 2darray
                var TwoDclass = [];
                for (let index = 0; index < listclass.length; index++) {
                    for (let index2 = 0; index2 < listclass[index].length / 5; index2++) {
                        if (index2 === 0) {
                            TwoDclass.push([
                                listclass[index].slice(index2 * 5, index2 * 5 + 5),
                            ]);
                        } else {
                            TwoDclass[index].push(
                                listclass[index].slice(index2 * 5, index2 * 5 + 5)
                            );
                        }
                        TwoDclass[index][index2].unshift("Thứ " + (index2 + 2));
                    }
                }

                console.log(TwoDclass);
                setItems({
                    ...item,
                    column: TwoDclass.map((arrayx) => (arrayx.map((arr) => ({
                        day: arr[0],
                        1: arr[1],
                        2: arr[2],
                        3: arr[3],
                        4: arr[4],
                        5: arr[5],
                    })))),
                });
                setData(TwoDclass[0].map((arr) => ({
                    day: arr[0],
                    1: arr[1],
                    2: arr[2],
                    3: arr[3],
                    4: arr[4],
                    5: arr[5],
                })));
                setTitleClass(body[0][0].name)
            }
            //   console.log(response.status)
            //   if(response.status>400){
            //     setOpen(true);
            //   }
            // let body = response.data;
            //  let body=[[1,24]]
            //   setClassList(body[0])
            //   console.log(body[0])
            //   for (let index = 1; index < body.length; index++) {
            //     for (let index2 = 0; index2 < body[index].length; index2++) {
            //       var value =
            //         body[index][index2].subject + " - " + body[index][index2].teacher;
            //       if (index === 1) {
            //         listclass.push([value]);
            //       } else {
            //         listclass[index2].push(value);
            //       }
            //     }
            //   }
            //   //convert each class to 2darray
            //   var TwoDclass = [];
            //   for (let index = 0; index < listclass.length; index++) {
            //     for (let index2 = 0; index2 < listclass[index].length / 5; index2++) {
            //       if (index2 === 0) {
            //         TwoDclass.push([
            //           listclass[index].slice(index2 * 5, index2 * 5 + 5),
            //         ]);
            //       } else {
            //         TwoDclass[index].push(
            //           listclass[index].slice(index2 * 5, index2 * 5 + 5)
            //         );
            //       }
            //       TwoDclass[index][index2].unshift("Thứ " + (index2 + 2));
            //     }
            //   }

            //   console.log(TwoDclass);
            //   setItems({
            //     ...item,
            //     column: TwoDclass.map((arrayx) => (arrayx.map((arr)=>({
            //         day: arr[0],
            //         1: arr[1],
            //         2: arr[2],
            //         3: arr[3],
            //         4: arr[4],
            //         5: arr[5],
            //     })))),
            //   });
            //   setData(TwoDclass[0].map((arr) => ({
            //     day: arr[0],
            //     1: arr[1],
            //     2: arr[2],
            //     3: arr[3],
            //     4: arr[4],
            //     5: arr[5],
            // })));
            // setTitleClass(body[0][0].name)
        }
        schedule();
    }, []);

    function onclickClass(className) {
        setTitleClass(className);
        var index = classList.findIndex(event => event.name === className)
        setData(item.column[index])
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        select
                        fullWidth
                        label="Lớp"
                        id="grade"
                        autoComplete="grade"
                        onChange={(e) => onclickClass(e.target.value)}
                        InputLabelProps={{
                            shrink: titleClass != null && titleClass.length > 0 ? true : false,
                        }}
                        value={titleClass}
                        key={titleClass}
                    >
                        {classList.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <MaterialTable
                    icons={tableIcons}
                    title={"Thời khóa biểu " + (typeof titleClass != 'undefined' ? titleClass : "")}
                    columns={state.columns}
                    data={data}
                    options={{
                        // search: false,
                        pageSize: 6,
                        paging: false,
                    }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error">
                        {errorm}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}
