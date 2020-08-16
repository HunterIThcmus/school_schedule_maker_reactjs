import React, { useState, useEffect } from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ScheduleReponsitory from "../../services/ScheduleReponsitory"
import { forwardRef } from "react";
import MaterialTable from "material-table";


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
import TeacherReponsitory from "../../services/TeacherReponsitory";
import { useHistory } from "react-router-dom";

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
export default function Home() {
    const classes = useStyles();
    const [data, setData] = useState([[]])
    const [state, setState] = React.useState({
        columns: [
            { title: "Thứ 2", field: "mon" },
            { title: "Thứ 3", field: "tus" },
            { title: "Thứ 4", field: "wed" },
            { title: "Thứ 5", field: "thu" },
            { title: "Thứ 6", field: "fri" },
            { title: "Thứ 7", field: "sat" },
        ],
    });
    var array = new Array();
    useEffect(() => {
        async function schedule() {
            const response = await ScheduleReponsitory.getSchedule();
            let body = response.data;
            // setData(body)
            // setState(body[0].map(({name}) => {
            //     return {
            //         title: name, field: name
            //     }
            // }))
            for (let index = 1; index < body.length; index++) {
                //    for (let j = 0; j < body[index].length; j++) {

                //    }
                // array.push(body[index][1])
                console.log(body[index][0])
            }
        }

        schedule();
    }, [])


    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <MaterialTable
                    icons={tableIcons}
                    title="Thời khóa biểu"
                    columns={state.columns}
                    //   data={data}
                    options={{
                        search: false,
                    }}

                />
            </div>
        </Container>
    );
}
