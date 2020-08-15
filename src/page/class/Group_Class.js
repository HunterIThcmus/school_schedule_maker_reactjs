import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Class from "./component/Class";
import ListClass from "./component/List_class";


// const onFinish = values => {
//     console.log('Vui lòng nhập đầy đủ thông tin.', values);
// }
// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//         </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(3),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

// const value = [{ title: '10', value: 10 }, { title: '11', value: 11 }, { title: '12', value: 12 },];

export default function Page() {
    const[add,setAdd]=useState("true");

    return (
        <Container component="main">
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Class add={add} change={setAdd}></Class>
                </Grid>
                <Grid item xs={8}>
                    <ListClass add={add}></ListClass>
                </Grid>
            </Grid>

        </Container>

    );
};
