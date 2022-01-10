import React from 'react'
import { View } from 'react-native';
import logo from "../manager.png";
import Header from './Header';
export const ManagerHomePage = (props: { history: string[]; }) => {
    const EmpRecognition = (e: { preventDefault: () => void; }) => {
        props.history.push("./EmployeeRecognition");
    }
    const EmpRating = (e: { preventDefault: () => void; }) => {
        props.history.push("./EmployeeRating");
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
                    <button button-type='submit' className="btn btn-primary " onClick={EmpRecognition} >Self Rating</button> &nbsp;
                    <button button-type='submit' className="btn btn-primary " onClick={EmpRating}>Employee Rating</button>
                </form>
            </div>
        </div>
    )
}
ManagerHomePage.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default ManagerHomePage;