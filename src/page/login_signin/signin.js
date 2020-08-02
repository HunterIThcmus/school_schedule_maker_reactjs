import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeadPW=this.onChangeRepeadPW.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            email: '',
            password:'',
            repeat_password:''
        }
    }
    onChangeName(e){
        this.setState({name: e.target.value})
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onChangeRepeadPW(e) {
        this.setState({ repeat_password: e.target.value })
 
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name:this.state.name,
            email: this.state.email,
            password:this.state.password,
            repeat_password:this.state.password
        };

        axios.post('https://scheduleapi.herokuapp.com/user/register', userObject,{
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },responseType: 'json'})
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
            alert('your account created');
        this.setState({ name: '',email: '',password:'',repeat_password:'' })
    }
    render(){
    return (
        <div className="wrapper">
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>  Name</label>
                <input type="text" value={this.state.name} onChange={this.onChangeName} className="form-control" />
            </div>
            <div className="form-group">
                <label>  Email</label>
                <input type="text" value={this.state.email} onChange={this.onChangeEmail} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={this.onChangePassword} className="form-control" />
            </div>
            <div className="form-group">
                <label>repeat_password number </label>
                <input type="text" value={this.state.repeat_password} onChange={this.onChangeRepeadPW} className="form-control" />
            </div>
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
    </div>
    )
    }
}