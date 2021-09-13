import React, { Component } from 'react';
import {Button, createTheme, TextField, ThemeProvider} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./RegistrationStyle.css";
import hidePwd from "../../images/hidePwd.png";
import showPwd from "../../images/showPwd.png";

const theme = createTheme({
    palette: {
        primary: {
            main: "#F2AA4CFF",
        }
    }
});
export default class Registration extends Component{
    state = {
        signupData: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            fullName: ""
        },
        hidden: true,
        errMsgFirstName: "",
        errMsgLastName: "",
        errMsgPhone: "",
        errMsgEmail: "",
        errMsgPassword: "",
        successMsg: "",
        error: false,
    }
    rootApi = "http://127.0.0.1:8000/api"
    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    onChangeHandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState( { signupData } );
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append(formData.firstName, this.state.signupData.firstName)
        formData.append(formData.lastName, this.state.signupData.lastName);
        formData.append(formData.phone, this.state.signupData.phone);
        formData.append(formData.email, this.state.signupData.email);
        formData.append(formData.password, this.state.signupData.password);

        var requestOption = {
            method: "POST",
            body: formData
        }
        fetch(this.rootApi + "/user/register", requestOption)
            .then(response => response.json)
            .then(result => {
                if (result.status === "success"){
                    this.setState({
                        signupData: {
                            firstName: "",
                            lastName: "",
                            phone: "",
                            email: "",
                            password: "",
                        },
                        errMsgFirstName: "",
                        errMsgLastName: "",
                        errMsgPhone: "",
                        errMsgEmail: "",
                        errMsgPassword: "",
                        error: false,
                    })
                }
                setTimeout(() => {
                    this.setState({ successMsg: result.message, })
                }, 1000)
                if (result.status === "error" && result.validation_errors.firstName){
                    this.setState({
                        error: true,
                        errorMsgFirstName: result.validation_errors.firstName[0],
                    })
                }
                if (result.status === "error" && result.validation_errors.lastName){
                    this.setState({
                        error: true,
                        errorMsgLastName: result.validation_errors.lastName[0]
                    })
                }
                if (result.status === "error" && result.validation_errors.phone){
                    this.setState({
                        error: true,
                        errorMsgPhone: result.validation_errors.phone[0],
                    })
                }
                if (result.status === "error" && result.validation_errors.email){
                    this.setState({
                        error: true,
                        errorMsgEmail: result.validation_errors.email[0],
                    })
                }

                if (result.status === "error" && result.validation_errors.password){
                    this.setState({
                        error: true,
                        errorMsgPassword: result.validation_errors.password[0],
                    })
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Container>
                <div className="text-center">
                    <i className="fa fa-2x fa-lock" aria-hidden="true"></i>
                    <div className="text-color">Signup</div>
                    <div className="hr"></div>
                </div>
                <ThemeProvider theme={theme}>
                    <div className="d-flex justify-content-around mb-5">
                        <div className="txt-first">
                            <TextField
                                error={this.state.error}
                                name="firstName"
                                label="First Name"
                                fullWidth
                                hinttext="Phone"
                                color="primary"
                                variant="outlined"
                                value={this.state.signupData.firstName}
                                onChange={this.onChangeHandler}
                                autoFocus
                                helperText={this.state.errMsgFirstName}
                            ></TextField>
                        </div>
                        <div className="txt-last">
                            <TextField
                                error={this.state.error}
                                name="lastName"
                                label="Last Name"
                                color="primary"
                                variant="outlined"
                                value={this.state.signupData.lastName}
                                onChange={this.onChangeHandler}
                                fullWidth
                                helperText={this.state.errMsgLastName}
                            />

                        </div>
                    </div>
                    <div className="signup-wrapper">
                        <TextField
                            error={this.state.error}
                            name="phone"
                            label="Phone"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={this.state.signupData.phone}
                            onChange={this.onChangeHandler}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, 10)
                            }}
                            min={0}
                            helperText={this.state.errMsgPhone}
                        />
                        <TextField
                            error={this.state.error}
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={this.state.signupData.email}
                            onChange={this.onChangeHandler}
                            helperText={this.state.errMsgEmail}
                        />
                        <div className="show-hide-pwd-wrapper">
                            <TextField
                                error={this.state.error}
                                name="password"
                                label="Password"
                                type={this.state.hidden ? "password" : "text"}
                                fullWidth
                                variant="outlined"
                                value={this.state.signupData.password}
                                onChange={this.onChangeHandler}
                                helperText={this.state.errMsgPassword}
                            />
                            <img
                                src={this.state.hidden ? showPwd : hidePwd}
                                onClick={this.toggleShow}
                                alt="Show Password"
                                className="eyeIcon"
                            />
                        </div>
                        <div className="alert-success pl-5">{this.state.successMsg}</div>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={this.onSubmitHandler}
                        >SIGN UP</Button>
                        <p className="already-txt ml-5">
                            Already have an account?
                            <Link to="/login" className="sign-in-txt">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </ThemeProvider>
            </Container>
        )
    }
}
