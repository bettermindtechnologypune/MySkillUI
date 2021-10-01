import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import AdminLogin from "./AdminLogin";
const NotFoundPage = (props) =>{
    const submit = (e) => {
        props.history.push("/", { state: 'AdminLogin' });
    }
return(
    <div className="text-center col-6 mx-auto">
        <br /><br /><br />
    <h2>404 Page Not Found</h2><br /><br /><br />
     <button button-type='submit' className= "btn btn-primary btn-lg" onClick = {submit}>Back</button>
    </div>
)
}
 
export default NotFoundPage;