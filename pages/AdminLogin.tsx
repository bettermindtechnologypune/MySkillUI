import React, { Component } from "react"
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import logo from "./superAdmin.png";
import Footer from "./Footer";
import { useState } from 'react';
// import {toast} from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure()
export const AdminLogin = (props: { history: string[]; }) => {

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const submit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let collection = {}
    collection.UserName = UserName,
      collection.Password = Password
    console.log(collection);

    fetch('https://localhost:44369/api/Auth/Authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    })
      .then(response => {
        console.log(response)
        if (response.status == 200)
          return response.json()
        else {
          console.log(response)
          alert("Username or Password is not valid")
          throw new Error("Username or Password is not valid")
        }
      })
      .then(data => {
        console.log('Success:', data);
        localStorage.setItem('token', (data.token));
        alert("Success !")
        if(data.userType == 0){
        props.history.push("./OrganizationCreate");
        }else if (data.userType == 1){
        props.history.push("./BusinessUnitCreate");  
        } else if(data.userType == 2){
          props.history.push("./HrAdminHomePage");  
        }else if(data.userType == 3){
          props.history.push("./ManagerCreate");  
        }else if(data.userType == 4){
          props.history.push("./EmployeeCreate");  
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">My Skill</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link to = "./AdminLogin">Home</Link> */}
                <a className="nav-link active" aria-current="page" href="./">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <h2 className="text-center">Login Form</h2>

      <form onSubmit={submit}>
        <div className="imgcontainer">
          <img src={logo} alt="Avatar" className="avatar" />
        </div>

        <div className="container inputOne text-center">
          <label><b>Username</b></label><br />
          <input type="text" placeholder="Enter Username" name="uname" value={UserName} onChange={(e) => setUserName(e.target.value)} className="formInput" required /><br />

          <label><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="psw" value={Password} onChange={(e) => setPassword(e.target.value)} className="formInput" required /><br /><br />

          <button className="btn btn-primary btn-lg" type="submit">Login</button><br />
        <br />
          <span className="psw"><a href="./ForgotPassword">Forgot Password</a></span>
        </div>
        <div className="container">
          {/* <button type="button" className="cancelbtn">Cancel</button> */}
         
        </div>
      </form>
      <View>
        <View >
          <Footer />
        </View>
      </View>
    </div>

    // </div>
  )
}
AdminLogin.defaultProps = {
  title: "Skill Base",
  searchBar: true
}
export default AdminLogin;
