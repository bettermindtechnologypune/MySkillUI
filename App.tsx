import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import  ReactDOM  from 'react';
import Header from './Header';
import NotFoundPage from "./404";
import Main from './Main';
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import SignUpPage from './SignUpPage';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

// import {Dropdown  } from "react-native";
// import { Dropdown } from "react-native-material-dropdown";
const { height } = Dimensions.get('screen');

const App = () => {

  return (
    <Router>
      <Switch>
      <Route exact path ="/404" component = {NotFoundPage}/>
      <Route exact path ="/" component = {AdminLogin}/>
      <Route exact path ="/SignUpPage" component = {SignUpPage}/>
      <Redirect to="/404"></Redirect>      
      </Switch>
    </Router>
    // ReactDOM.render(<AdminLogin me="Props"/>, document.getElementById("root"))
    // <View>
    //   <View >
    //     <Header />
        
    //     <AdminLogin/>
    //     <SignUp/>
    //     {/* <Main /> */}
    //     {/* <Navbar/> */}
    //     <Footer/>
    //     {/* <Example /> */}
    //   </View>
    // </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;