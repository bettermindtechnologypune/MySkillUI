import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Header from './pages/Header';
import NotFoundPage from "./pages/404";
import UploadXMLFile from "./pages/UploadXMLFile";
import AdminLogin from "./pages/AdminLogin";
import OrganizationCreate from './pages/OrganizationCreate';
import BusinessUnitCreate from "./pages/BusinessUnitCreate";
import DepartmentCreate from "./pages/DepartmentCreate";
import EmployeeCreate from "./pages/EmployeeCreate";
import HrAdminHomePage from "./pages/HrAdminHomePage";
import ForgotPassword from "./pages/ForgotPassword";
import EmployeeRecognition from "./pages/EmployeeRecognition";
import ManagerHomePage from "./pages/ManagerHomePage";
import EmployeeRating from "./pages/EmployeeRating";
import ManagerRating from "./pages/ManagerRating";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import UpdateLevelOne from './pages/UpdateLevelOne';
import UpdateLevelTwo from './pages/UpdateLevelTwo';
import SkillLevelCharts from './pages/SkillLevelCharts';
import EmployeeHomePage from './pages/EmployeeHomePage';
import MultiSkillLevelChart from './pages/MultiSkillLevelChart';
import SkillIndexChart from './pages/SkillIndexChart';
import OrganizationHomePage from './pages/OrganizationHomePage';
import SkillMeasurementReport from './pages/SkillMeasurementReport';
import { ResetPassword } from './pages/ResetPassword';

const { height } = Dimensions.get('screen');

const App = () => {

  return (
    <Router>
      <Switch>
      <Route exact path ="/404" component = {NotFoundPage}/>
      <Route exact path ="/" component = {AdminLogin}/>
      <Route exact path ="/OrganizationCreate" component = {OrganizationCreate}/>
      <Route exact path ="/BusinessUnitCreate" component = {BusinessUnitCreate}/>
      <Route exact path ="/UploadXMLFile" component = {UploadXMLFile}/>
      <Route exact path ="/DepartmentCreate" component = {DepartmentCreate}/>
      <Route exact path ="/EmployeeCreate" component = {EmployeeCreate}/>
      <Route exact path ="/HrAdminHomePage" component = {HrAdminHomePage}/>
      <Route exact path ="/ForgotPassword" component = {ForgotPassword}/>
      <Route exact path ="/EmployeeRecognition" component = {EmployeeRecognition}/>
      <Route exact path = "/ManagerHomePage" component = {ManagerHomePage}/>
      <Route exact path = "/EmployeeRating" component = {EmployeeRating}/>
      <Route exact path = "/ManagerRating/:id/:isManager" component = {ManagerRating}/>
      <Route exact path = "/UpdateLevelOne" component = {UpdateLevelOne}/>
      <Route exact path = "/UpdateLevelTwo" component = {UpdateLevelTwo}/>
      <Route exact path = "/EmployeeHomePage" component = {EmployeeHomePage}/>
      <Route exact path = "/SkillLevelCharts" component = {SkillLevelCharts}/>
      <Route exact path = "/MultiSkillLevelChart" component = {MultiSkillLevelChart}/>
      <Route exact path = "/SkillIndexChart" component = {SkillIndexChart}/>
      <Route exact path = "/OrganizationHomePage" component = {OrganizationHomePage}/>
      <Route exact path = "/SkillMeasurementReport" component = {SkillMeasurementReport}/>
      <Route exact path = "/ResetPassword/:id" component = {ResetPassword}/>
      
      <Redirect to="/404"></Redirect>      
      </Switch>
    </Router>

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