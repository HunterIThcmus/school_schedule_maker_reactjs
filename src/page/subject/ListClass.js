// import React, { useState, useEffect } from "react";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import Container from '@material-ui/core/Container';
// import ListClass from "../class/component/List_class";


// import SubjectInClass from "./page/subject/ListClass"
// export default function Page() {

//     return (
//         <Container component="main">
//             <CssBaseline />
//                 <Grid item xs={12}>
//                     <ListClass add={"false"}></ListClass>
//                 </Grid>

//         </Container>

//     );
// };

import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import authHeader from "../../services/AuthHeader";
import Button from "@material-ui/core/Button";

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

export default function Class(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    const [data10, setData10] = useState();
    const [data11, setData11] = useState();
    const [data12, setData12] = useState();

    const [isBusy, setBusy] = useState(true);
    const history = useHistory()

    async function handleButtonView(index,key) {
        var parma1,parma2;
        if(key=="10"){
            parma1=data10[index]._id;
            parma2=data10[index].name;
        } else if(key=="11"){
            parma1=data11[index]._id;
            parma2=data11[index].name;
        }
        else{
            parma1=data12[index]._id;
            parma2=data12[index].name;
        }
        history.push("/subject/view/" + parma1 + "/" + parma2);

    }

    const fetchData = async () => {
        // setBusy(true);
        try {
            let response = await fetch(`https://scheduleapi.herokuapp.com/classes`,
                {
                    method: 'GET',
                    headers: authHeader(),
                    body: JSON.stringify()
                }
            )
            console.log(response)
            let responseData = await response.json();
            console.log(responseData)
            let data10 = [];
            let data11=[];
            let data12=[];
            for (let i = 0; i < responseData.data.length; i++) {
                if (responseData.data[i].grade == 10) {
                    data10.push(responseData.data[i]);
                }else if(responseData.data[i].grade == 11){
                    data11.push(responseData.data[i]);
                } else{
                    data12.push(responseData.data[i]);
                }
            }
            setData10(data10);
            setData11(data11);
            setData12(data12);

            setBusy(false);
        } catch (error) {
            console.log("thow " + error.message);
        }
    }

    useEffect(() => {
        fetchData()
    }, [props.add])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> DANH SÁCH LỚP  </Typography>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h6"> Khối 10  </Typography>
                        </Grid>
                        {isBusy ? (<p></p>) : (
                            data10.map((item, index) => <li key={item.name}>
                                <Grid item xs={2}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="primary" onClick={() => handleButtonView(index,"10")}
                                    >{item.name}</Button>
                                </Grid>
                                {/* </Grid> */}

                            </li>))}
                    </Grid>
                </div>
              <br></br>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h6"> Khối 11  </Typography>
                        </Grid>
                        {isBusy ? (<p></p>) : (
                            data11.map((item, index) => <li key={item.name}>
                                <Grid item xs={2}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="secondary" onClick={() => handleButtonView(index,"11")}
                                    >{item.name}</Button>
                                </Grid>
                                {/* </Grid> */}
                            </li>))}
                    </Grid>
                </div>
                <br></br>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h6"> Khối 12  </Typography>
                        </Grid>
                        {isBusy ? (<p></p>) : (
                            data12.map((item, index) => <li key={item.name}>
                                <Grid item xs={2}>
                                    <Button
                                        width="120"
                                        variant="contained"
                                        color="normal" onClick={() => handleButtonView(index,"12")}
                                    >{item.name}</Button>
                                </Grid>
                                {/* </Grid> */}

                            </li>))}
                    </Grid>
                </div>
            </div>
        </Container>
    );
};
