
import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TeacherReponsitory from "../../services/TeacherReponsitory"
import { useHistory } from "react-router-dom";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function TeacherList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Mã số giáo viên', field: 'id' },
            { title: 'Tên giáo viên', field: 'name' },
            { title: 'Số tiết trong tuần', field: 'period_per_week', type: 'numeric' },
            { title: 'Khối', field: 'grade', type: "numeric" },
            { title: 'Môn học', field: 'subject' },
        ],
    });
    const [item, setItems] = React.useState([])
    React.useEffect(() => {
        async function getCharacters() {
            const response = await TeacherReponsitory.getAllTeacher();
            let body = response.data;
            setItems(body.data.map(({ teacher_id, name, period_per_week, grade, subject }) => ({ id: teacher_id, name: name, period_per_week: period_per_week, grade: grade, subject: subject })));
        }
        getCharacters();
    }, [])
    const history = useHistory();
    function update(id) {
        history.push(`/teacher?id=${id}`);
    }
    function deleteItem(id) {
        // history.push("/teacher?id=${id}");
    }
    return (
        <MaterialTable
            icons={tableIcons}
            title="Danh sách giáo viên"
            columns={state.columns}
            data={item}
            actions={[{
                icon: tableIcons.Edit,
                tooltip: 'Chỉnh sửa',
                onClick: (event, rowData) => update(rowData.id)
            },
            {
                icon: tableIcons.Delete,
                tooltip: 'Xóa',
                onClick: (event, rowData) => deleteItem(rowData.id)
            }
            ]}
        editable={{
            onRowAdd: (newData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return { ...prevState, data };
                        });
                    }, 600);
                }),
        }}
        />
    );
}


