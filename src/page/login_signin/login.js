import React, { Component } from 'react';
import axios from 'axios';
import "./login.css";
import "./nouislider.min.css";
export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password:''
        }
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const userObject = {

            email: this.state.email,
            password:this.state.password
        };

        axios.post('https://scheduleapi.herokuapp.com/user/login', userObject,{
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },responseType: 'json'})
            .then((res) => {
                console.log(res.data.token)
            }).catch((error) => {
                console.log(error)
            });
            alert('your account created');
        this.setState({ email: '',password:'' })
    }

    // render(){
    // return (
    //     <div className="wrapper">
    //     <form onSubmit={this.onSubmit}>
    //         <div className="form-group">
    //             <label>  Email</label>
    //             <input type="text" value={this.state.email} onChange={this.onChangeEmail} className="form-control" />
    //         </div>
    //         <div className="form-group">
    //             <label>Password</label>
    //             <input type="password" value={this.state.password} onChange={this.onChangePassword} className="form-control" />
    //         </div>
    //         <div className="form-group">
    //             <input type="submit" value="Create User" className="btn btn-primary" />
    //         </div>
    //     </form>
    // </div>
    // )
    // }
    render(){
        return (
            <div class="container">
                <div class="login-form">
                        <h3 class="billing-title text-center">Đăng nhập</h3>
                        <p class="text-center mt-80 mb-40">Chào mừng trở lại! đăng nhập vào tài khoản của bạn </p>
                        <div class="alert alert-danger login-fail" role="alert">
                            Tài khoản hoặc mật khẩu không chính xác
                        </div>
                        <input type="text" placeholder="Tên tài khoản*" name="lg_username" class="input"/>
                        <input placeholder="Mật khẩu*" name="lg_password" class="input mt-20"/>
                        <button class="view-btn color-2 mt-20 w-100 btn-login" ><span>Đăng nhập</span></button>
                        <div class="mt-20 d-flex align-items-center justify-content-between text-center">
                            <a href="/forgetpass">Quên mật khẩu?</a>
                        </div>
                </div>
        </div>
        )
        }
}