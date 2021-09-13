import React, { Component } from 'react';
import { Toolbar, Typography, AppBar, Button } from '@material-ui/core';

export type HeaderProps = {}

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    };

    rootApi = "http://127.0.0.1:8000/api"

    todoLogout = () => {
        let token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer: ${token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders
        };
        fetch(this.rootApi + "/user/logout", requestOptions)
            .then(response => response.json)
            .then(result => {
                if (result.status === "success"){
                    window.location.reload();
                    sessionStorage.clear();
                    let temp = window.location.origin;
                    window.location.href = temp + "/login";
                }
            })
            .catch(error => console.log("error",error))
    };
    componentDidMount(){
        let isLoggedIn = sessionStorage.getItem("isLoggedIn");
        this.setState({isLoggedIn: isLoggedIn});
    }

    render (){
        const { isLoggedIn } = this.state;
        let logoutDiv = null;
        if (isLoggedIn === "true"){
            logoutDiv = (
                <AppBar
                    position="static"
                    style={{ color: "black", backgroundColor: "#F2AA4CFF" }}>
                    <Toolbar
                        style={{ display: "flex", justifyContent: "space-between"}}
                    >
                        <Typography variant="h6">Todo App</Typography>
                        <Button onClick={this.todoLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            )
        }
        if (isLoggedIn === null){
            logoutDiv = (
                <AppBar
                    position="static"
                    style={{ color: "black", backgroundColor:  "#F2AA4CFF"}}
                >
                    <Toolbar
                    style={{display: "flex", justifyContent: "space-between"}}
                    >
                        <Typography variant="h6">Todo App</Typography>
                    </Toolbar>
                </AppBar>
            )
        }
        return <div>{logoutDiv}</div>;
    };
}
