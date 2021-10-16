import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';
import Employee from '../model/Employee';
import Department from '../model/Department';
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
    const [departments, setDepartmentData] = useState<any>();
    const [department, setDepartment] = useState<any>();
    // const [managerEmpID, setManagerEmpID] = useState("");
    const [managerName, setManagerName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [age, setAge] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isManager, setIsManager] = useState("");
    const [education, setEducation] = useState("");

    useEffect(() => {
        (async () => {
            var departments = await getDepartments();
            // var dept = [];
            // let de = new Department()
            // de.Id = "1221212166"
            // de.Name = "R&D"
            // dept.push(de);

        })()

    }, [])

    const getDepartments = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');

        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/Department/GetList', httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data != undefined) {
                    setDepartment(data[0])
                    setDepartmentData(data)
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleChange = (id: string) => {
        setDepartment(id);
    }

    const submit = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        if (!employeeFirstName && !employeeID && !empEmail ) {
            alert("Required Fields can not be blank..")
        } else {
            // let collection = {};
            let empl: Employee = new Employee();
            var isTrueSet = isManager === 'yes' ? true : false;
            empl.FirstName = employeeFirstName,
                empl.LastName = empLastName,
                empl.OrgEmpId = employeeID,
                empl.Email = empEmail,
                empl.DOB = dob,
                empl.Grade = grade,
                empl.DOJ = doj,
                empl.DepartmentId = department,
                empl.Address = address,
                empl.City = city,
                empl.State = stateName,
                empl.Age = age,
                empl.ContactNumber = phoneNumber,
                empl.IsManager = isTrueSet,
                empl.Education = education,

                // console.log(collection);
                fetch('https://localhost:44369/api/Employee/Create', {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(empl),
                })
                    .then(response => {
                        if (response.status == 200)
                            return response.json()
                        else {
                            console.log(response)
                            throw new Error("Unauthorized")
                        }
                    })
                    .then(data => {
                        console.log('Success:', data);
                        alert("Successfully Added Employee !");
                        props.history.push("./");
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
        }
    }
    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
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
                                    {departments &&
                                        <div className="col-sm-4 form-group">
                                            <label>Department</label>
                                            <select name="department" className="form-control" value={department.id} onChange={(event) => handleChange(event.target.value)}>
                                                {departments.map((e: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => {
                                                    return <option key={key} value={e.id}>{e.name}</option>;
                                                })}
                                            </select>
                                        </div>
                                    }
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
                                </div>
                                <br />
                                {/* <div className="text-center">  */}
                                <button type="submit" className="btn btn-primary" >Submit</button>&nbsp; &nbsp;
                                <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
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
