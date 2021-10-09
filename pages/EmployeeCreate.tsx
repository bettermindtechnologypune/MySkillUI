import React, { FC, ChangeEvent } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';

export class EmployeeResource {

    public Name: string | undefined;

}
// import logo from './images/superAdmin.png';
export const EmployeeCreate = (props: { history: string[]; title: string; state: string; }) => {
    const [employeeFirstName, setEmployeeFirstName] = useState("");
    const [empLastName, setEmpLastName] = useState("")
    const [employeeID, setEmployeeID] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [dob, setDOB] = useState("");
    const [grade, setGrade] = useState("");
    const [doj, setDOJ] = useState("");
    const [compName, setCompName] = useState("");
    const [department, setDepartment] = useState("");
    const [managerEmpID, setManagerEmpID] = useState("");
    const [managerName, setManagerName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isManager, setIsManager] = useState("");
    const [education, setEducation] = useState("");
    const submit = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        if (!employeeFirstName && !employeeID && !empEmail && !managerEmpID) {
            alert("Required Fields can not be blank..")
        } else {
            let collection = {};
            var isTrueSet = isManager === 'yes' ? true : false;
            collection.EmployeeFirstName = employeeFirstName,
                collection.EmpLastName = empLastName,
                collection.EmployeeID = employeeID,
                collection.EmpEmail = empEmail,
                collection.DOB = dob,
                collection.Grade = grade,
                collection.DOJ = doj,
                collection.CompName = compName,
                collection.Department = department,
                collection.ManagerEmpID = managerEmpID,
                collection.ManagerName = managerName,
                collection.Address = address,
                collection.City = city,
                collection.StateName = stateName,
                collection.Age = age,
                collection.PhoneNumber = phoneNumber,
                collection.IsManager = isTrueSet,
                collection.Education = education,

                console.log(collection);
            var bearer = localStorage.getItem('token');
            fetch('https://localhost:44369/api/Employee/Create', {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collection),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 401) {
                        console.log('Unauthorized:', data);
                        alert("Please enter a valid data")
                    } else {
                        console.log('Success:', data);
                        props.history.push("./");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    function displayFun() {
        alert("True");
        a = document.getElementById("demo");
        b = document.createElement("input");
        b.setAttribute("type", "text");
        a.appendChild(b);

    }
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
                                <a className="nav-link active" aria-current="page" href="./">Logout</a>
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

            <div className="container">
                <h1 className="well">Employee Registration Form</h1>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={submit}>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>Employee First Name</label>
                                        <input type="text" placeholder="Enter First Name Here.." value={employeeFirstName} onChange={(e) => setEmployeeFirstName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Employee Last Name</label>
                                        <input type="text" placeholder="Enter Last Name Here.." value={empLastName} onChange={(e) => setEmpLastName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Employee ID</label>
                                        <input type="text" placeholder="Enter Employee ID Here.." value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>Date of Birth</label>
                                        <input type="date" value={dob} onChange={(e) => setDOB(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Grade</label>
                                        <input type="text" placeholder="Enter Grade Here.." value={grade} onChange={(e) => setGrade(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Date of Joining</label>
                                        <input type="date" value={doj} onChange={(e) => setDOJ(e.target.value)} className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>Employee Email Address</label>
                                        <input type="text" placeholder="Enter Email Address Here.." value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Education</label>
                                        <input type="text" placeholder="Enter Education Here.." value={education} onChange={(e) => setEducation(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Is Manager</label><br />
                                        <select name="sbu" className="form-control" value={isManager} onChange={(e) => setIsManager(e.target.value)} id="sbus">
                                            <option value="selectOption">Select Here</option>
                                            <option value="yes">Yes</option>
											<option value="no">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>Company</label>
                                        <input type="text" placeholder="Enter Company Here.." value={compName} onChange={(e) => setCompName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Department</label><br />
                                        <select name="sbu" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} id="sbus">
                                            <option value="selectOption">Select Here</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Manager Emp ID</label>
                                        <input type="text" placeholder="Enter Manager Emp ID Here.." value={managerEmpID} onChange={(e) => setManagerEmpID(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>Manager Name</label>
                                        <input type="text" placeholder="Enter Manager Name Here.." value={managerName} onChange={(e) => setManagerName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Address</label>
                                        <input type="text" placeholder="Enter Address Here.." value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>City</label>
                                        <input type="text" placeholder="Enter City Name Here.." value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <label>State</label>
                                        <input type="text" placeholder="Enter State Name Here.." value={stateName} onChange={(e) => setStateName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Age</label>
                                        <input type="text" placeholder="Enter Age Here.." value={age} onChange={(e) => setAge(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-sm-4 form-group">
                                        <label>Contact Number</label>
                                        <input type="text" placeholder="Enter Contact Number Here.." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" />
                                    </div>
                                </div><br />
                                {/* <div className="text-center">  */}
                                <button type="submit" className="btn btn-lg btn-info" >Submit</button>
                                {/* </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <View>
                <View >
                    <Footer />
                </View>
            </View>
        </div>
    )
}
export default EmployeeCreate;
EmployeeCreate.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
