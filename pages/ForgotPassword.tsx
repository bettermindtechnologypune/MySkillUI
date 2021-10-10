import React, { useState } from 'react'
import { View } from 'react-native';
import Header from "./Header";
import DepartmentCreate from "./DepartmentCreate";
import EmployeeCreate from "./EmployeeCreate";
export const ForgotPassword = (props: { history: string[]; }) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{props.title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <Link to = "./AdminLogin">Home</Link> */}
                                <a className="nav-link active" aria-current="page" href="./">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">{props.state}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <form >
                    <div className="container inputOne text-center">
                        <h3>Forgot Password</h3><br />
                        <label><b>Email Address :</b></label>&nbsp;
                        <input type="text" placeholder="Enter Registered Email Address" name="uname" value={UserName} onChange={(e) => setUserName(e.target.value)} className="formInput" required /><br /><br />
                        <button className="btn btn-primary" type="submit">Submit</button><br />
                    </div>
                </form>
            </div>
        </div>
    )
}
ForgotPassword.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default ForgotPassword;