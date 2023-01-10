import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  
  logOut = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  render() {
    return (
      <div>
        Welcome<h1>{this.state.userData.name}</h1>
        You have $<h1>{this.state.userData.balance}</h1>
        <button className="btn btn-outline-primary" onClick={this.logOut}>
          Log Out
        </button>
      </div>
    );
  }
}
