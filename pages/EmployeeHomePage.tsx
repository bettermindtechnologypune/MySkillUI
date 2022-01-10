import React from 'react';
import logo from "../emp2.png";
import { View } from 'react-native';
import Footer from "./Footer";
import Header from './Header';
export const EmployeeHomePage = (props: { history: string[]; }) => {
    const ExistingEmpRecognition = (e: { preventDefault: () => void; }) => {
        props.history.push(`./ManagerRating/${localStorage.getItem('empId')}/false`);
    }
    const EmpRating = (e: { preventDefault: () => void; }) => {
        props.history.push("./EmployeeRecognition");
    }

    return (
        <div>
            <View>
                <View >
                    <Header />
                </View>
            </View>
            <div className="text-center col-6 mx-auto"><br /><br />
                <h3>Welcome to Home page</h3><br />
                <form >
                    <div className="imgcontainer">
                        <img src={logo} alt="Avatar" className="avatar1" />
                    </div>
                    <br /><br />
                    <button button-type='submit' className="btn btn-primary " onClick={ExistingEmpRecognition} >Existing Rating</button> &nbsp;
                    <button button-type='submit' className="btn btn-primary " onClick={EmpRating}>New Rating</button>
                </form>
            </div>
            <View>
                <View >
                    <Footer />
                </View>
            </View>
        </div>
    )
}
EmployeeHomePage.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default EmployeeHomePage;