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
    const [data, setData] = useState([])
    const [item, setItems] = React.useState([[]]);
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
    var listclass = [];
    useEffect(() => {
        async function schedule() {
            const response = await ScheduleReponsitory.getSchedule();
            let body = response.data;
            console.log(body[1], response.status)
            for (let index = 1; index < body.length; index++) {
                //    for (let j = 0; j < body[index].length; j++) {
                //    }
                for (let index2 = 0; index2 < body[index].length; index2++) {
                    var value = body[index][index2].subject + " - " + body[index][index2].teacher;
                    if (index === 1) {
                        listclass.push([value])
                    } else {
                        listclass[index2].push(value)
                    }
                }
            }

            //convert each class to 2darray
            var TwoDclass = [];
            for (let index = 0; index < listclass.length; index++) {

                for (let index2 = 0; index2 < listclass[index].length / 5; index2++) {
                    if (index2 === 0) {
                        TwoDclass.push([listclass[index].slice(index2 * 5, index2 * 5 + 5)])
                    } else {
                        TwoDclass[index].push(listclass[index].slice(index2 * 5, index2 * 5 + 5))
                    }
                    TwoDclass[index][index2].unshift("Thứ " + (index2 + 2))
                }
            }
            // console.log(TwoDclass, listclass.length, listclass[0] / 5);
            // function mapclass(item) {
            //     return item.map(
            //         (arrayx) => ({
            //             day: arrayx[0],
            //             1: arrayx[1],
            //             2: arrayx[2],
            //             3: arrayx[3],
            //             4: arrayx[4],
            //             5: arrayx[5]
            //         })
            //     )
            // }
            setItems(
                TwoDclass[0].map(
                                  (arrayx) => ({
                                    day: arrayx[0],
                                    1: arrayx[1],
                                    2: arrayx[2],
                                    3: arrayx[3],
                                    4: arrayx[4],
                                    5:arrayx[5]
                                  })
                    )
            );
            console.log(item);

        }
        schedule();
    }, []);
    // // link subject and teacher
    // for(let index=0 ;index < claas1.length; index++){
    //     claas1[index]=claas1[index].subject+" - "+claas1[index].teacher;
    // }
    // var TwoDclass1= new Array();

    // // convert to 2d
    // for(let index=0 ;index < body.length/5; index++){
    //     TwoDclass1.push(claas1.slice(index*5,index*5+5))
    //     TwoDclass1[index].unshift("Thứ "+(index+2))
    // }
    // console.log(TwoDclass1);
    // var tiet1=new Array();




    //var TwoDclass1temp=TwoDclass1.map()
    // TwoDclass1[0].map(
    //       ({ mon, tus, wes, thu, fri }) => ({
    //         tiet1.push(mon);
    //       })
    //     )
    //   );
    //         setItems(
    //             TwoDclass1.map(
    //               (arrayx) => ({
    //                 day: arrayx[0],
    //                 1: arrayx[1],
    //                 2: arrayx[2],
    //                 3: arrayx[3],
    //                 4: arrayx[4],
    //                 5:arrayx[5]
    //               })
    //             )
    //           );
    //         }
    //     schedule();

    // }, []);




    // var claas1 = [];
    // useEffect(() => {
    //     async function schedule() {
    //         const response = await ScheduleReponsitory.getSchedule();
    //         let body = response.data;
    //         console.log(body[0])
    //         for (let index = 1; index < body.length; index++) {
    //             //    for (let j = 0; j < body[index].length; j++) {
    //             //    }
    //             claas1.push(body[index][1])
    //             // console.log(body[index])
    //         }

    //         // link subject and teacher
    //         for(let index=0 ;index < claas1.length; index++){
    //             claas1[index]=claas1[index].subject+" - "+claas1[index].teacher;
    //         }
    //         var TwoDclass1= new Array();

    //         // convert to 2d
    //         for(let index=0 ;index < body.length/5; index++){
    //             TwoDclass1.push(claas1.slice(index*5,index*5+5))
    //             TwoDclass1[index].unshift("Thứ "+(index+2))
    //         }
    //         console.log(TwoDclass1);
    //         var tiet1=new Array();
    //         //var TwoDclass1temp=TwoDclass1.map()
    //         // TwoDclass1[0].map(
    //         //       ({ mon, tus, wes, thu, fri }) => ({
    //         //         tiet1.push(mon);
    //         //       })
    //         //     )
    //         //   );
    //         setItems(
    //             TwoDclass1.map(
    //               (arrayx) => ({
    //                 day: arrayx[0],
    //                 1: arrayx[1],
    //                 2: arrayx[2],
    //                 3: arrayx[3],
    //                 4: arrayx[4],
    //                 5:arrayx[5]
    //               })
    //             )
    //           );
    //         }
    //     schedule();

    // }, []);


    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <MaterialTable
                icons={tableIcons}
                title="Thời khóa biểu lop 10a2"
                columns={state.columns}
                data={item}
                options={{
                    search: false,
                }}
            />
                {/* {
                    item.map((itm, index) =>
                        <MaterialTable
                            icons={tableIcons}
                            title="Thời khóa biểu lop"
                            columns={state.columns}
                            data={itm}
                            options={{
                                search: false,
                            }}
                        />)} */}
            </div>
        </Container>
    );
}
