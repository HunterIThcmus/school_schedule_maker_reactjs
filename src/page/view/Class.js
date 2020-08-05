import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';


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

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const grade = [{title:'10', value:10},{title:'11', value:11},{title:'12', value:12},];

export default function Class() {
    const classes = useStyles();
    // const [value, setValue] = React.useState(grade[0]);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Nhập lớp </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="grade"
                                options={grade}
                                getOptionLabel={(option) => option.title}
                                fullWidth
                                // value={value}
                                renderInput={(params) => <TextField {...params} name ="grade" label="Chọn khối" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="nameclass"
                                variant="outlined"
                                required
                                fullWidth
                                id="nameclass"
                                label="Nhập số lượng lớp"
                                autoFocus
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        width="120"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                       Thêm mới
                     </Button>

                </form>
            </div>

        </Container>
    );
};
