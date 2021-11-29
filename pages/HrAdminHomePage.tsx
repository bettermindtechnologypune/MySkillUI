import React from 'react'
import { View } from 'react-native';
import Header from "./Header";
import DepartmentCreate from "./DepartmentCreate";
import EmployeeCreate from "./EmployeeCreate";
import { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import TaskModel from '../model/TaskModel';
const map1 = new Map();let li: TaskModel[] | { id: null; levelId: any; name: null; wattage: any; }[] | { wattage: string; }[] | undefined = []; 
var tak: string ; var takName: null = null; 
export const HrAdminHomePage = (props: { history: string[]; }) => {
    const [products, setProductData] = useState<any>();
    const [product, setProduct] = useState<any>();
    const [deliverables, setDeliverableData] = useState<any>();
    const [deliverable, setDeliverable] = useState<any>();
    const [tasks1, setTaskData] = useState<TaskModel[]>();
    const [task, setTask] = useState<any>();
    const [wattage, setWattage] = useState<any>();
    const [cou, setCount] = useState<any>(0);
    const DeptCreate = (e: { preventDefault: () => void; }) => {
        props.history.push("./DepartmentCreate");
    }
 
    const EmpCreate = (e: { preventDefault: () => void; }) => {
        props.history.push("./EmployeeCreate");
    }

    const updateLevelOne =  (e: { preventDefault: () => void; }) => {
        props.history.push("./UpdateLevelOne");
    }
    const updateLevelTwo =  (e: { preventDefault: () => void; }) => {
        props.history.push("./UpdateLevelTwo");
    }

    useEffect(() => {
        (async () => {
            
            var products = await getProducts();
            if (product != undefined) {
                var deliverables = await getDeliverables();
            }
            if (deliverable != undefined) {
                var tasks = await getTasks();
            }
          
        })()

    }, [])

    const getProducts = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');
        let buid = localStorage.getItem('buid');
        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/LevelOne/' + buid, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data != undefined) {
                    setProduct(data[0].id)
                    setProductData(data)
                    if (product != undefined) {
                        getDeliverables();
                    }
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const getDeliverables = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');
        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/LeveTwo/' + product, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data.status == 400) {
                    console.log("No data Found")
                }
                else if (data.status == 404) {
                    console.log("No data Found")
                }
                else if (data != undefined) {
                    setDeliverable(data[0].id)
                    setDeliverableData(data)

                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const getTasks = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');
        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/Task/' + deliverable, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data.status == 404) {
                    console.log("Data Not Found");
                    var olddata = document.getElementById("searchDepartments");
                    var rat = document.getElementById('searchRating');
                    while (olddata?.firstChild && rat?.firstChild) {
                        olddata?.removeChild(olddata.firstChild);
                        rat?.removeChild(rat.firstChild);
                    }
                } else if (data.status == 400) {
                    console.log("No data Found")
                }
                else if (data != undefined) {
                    setTask(data[0].id)
                    setTaskData(data)
                    li = data;
                    var sel = document.getElementById('searchDepartments');
                    var rat = document.getElementById('searchRating');
                    while (sel?.firstChild && rat?.firstChild) {
                        sel?.removeChild(sel.firstChild);
                        rat?.removeChild(rat.firstChild);
                    }
                    var opt = null; var opt1 = null; var lineB = null; let brek = null; var label1; var label2; let count = 0;
                    for (let i = 0; i < data.length; i++) {
                        lineB = document.createElement("br");
                        brek = document.createElement("br");
                        label1 = document.createElement("LABEL");
                        label1.innerHTML = "Task Name ";
                        label2 = document.createElement("LABEL");
                        label2.innerHTML = "Wattage ";
                        opt = document.createElement('input');
                        opt1 = document.createElement('input');
                        opt1.setAttribute("type", "number");
                        // opt1.setAttribute("max", "5");
                        opt1.setAttribute("min", "0");
                        opt1.className = "form-control";
                        opt.className = "form-control";
                        opt.id = data[i].id;
                        opt.value = data[i].name;
                        opt.innerHTML = data[i].name;
                        opt1.id = data[i].id;
                        opt1.innerHTML = data[i].wattage;
                        opt1.value = data[i].wattage;
                        map1.set(data[i].id, data[i].name+"/"+data[i].wattage);
                        count == 0 ? (sel == null ? document.getElementById('searchDepartments') : sel.appendChild(label1)) : count++;
                        sel == null ? document.getElementById('searchDepartments') : sel.appendChild(opt);
                        sel == null ? document.getElementById('searchDepartments') : sel.appendChild(brek);
                        sel == null ? document.getElementById('searchDepartments') : sel.addEventListener("change", updateTaskName);
                        count == 0 ? (rat == null ? document.getElementById('searchDepartments') : rat.appendChild(label2)) : count++;
                        rat == null ? document.getElementById('searchRating') : rat.appendChild(opt1);
                        rat == null ? document.getElementById('searchRating') : rat.addEventListener("change", updateWattage);
                        rat == null ? document.getElementById('searchRating') : rat.appendChild(lineB);
                        count++;
                    }
                    return data;
                }

                else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function updateWattage(e: { target: { value: any; id: any }; }) {
        setWattage(e.target.value);
        var arrray1 = li; let checkBol = true
        for (let userObject of arrray1) {
            console.log(userObject);
            if(userObject.id == e.target.id){
                let index = arrray1.indexOf(userObject);
                li?.splice(index, 1);
                userObject.wattage = parseInt(e.target.value);
                li?.push(userObject);
                checkBol = false;
            }
        }
        if(checkBol){
        let obj = {
            id: tak!=""?tak : undefined,
            levelId: deliverable,
            name: takName,
            wattage: parseInt(e.target.value)
    }
    li.push(obj);
        }
    }

    function updateTaskName(e: { target: { value: any; id: any }; }) {
        setTask(e.target.value);
        tak = e.target.id;
        takName = e.target.value;
        var arrray1 = li;
        for (let userObject of arrray1) {
            console.log(userObject);
            if(userObject.id == tak){
                let index = arrray1.indexOf(userObject);
                li?.splice(index, 1);
                userObject.name = e.target.value;
                li?.push(userObject);
            }
        }
       
    }
    const handleChange = (id: string) => {
        setProduct(id);
        if (product != undefined) {
            getDeliverables();
        }
    }
    const handleChange1 = (id: string) => {
        setDeliverable(id);
        if (deliverable != undefined) {
            getTasks();
        }
        // setRating(ratings);

    }
    const addFields = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        var sel = document.getElementById('searchDepartments');
        var rat = document.getElementById('searchRating');
        var opt = null; var opt1 = null; var lineB = null; let brek = null; var label1; var label2; let count = 0;
        lineB = document.createElement("br");
        brek = document.createElement("br");
        opt = document.createElement('input');
        opt1 = document.createElement('input');
        opt1.setAttribute("type", "number");
        opt1.setAttribute("min", "0");
        opt1.setAttribute("step", "2");
        opt1.className = "form-control";
        opt.className = "form-control";
        sel == null ? document.getElementById('searchDepartments') : sel.appendChild(opt);
        sel == null ? document.getElementById('searchDepartments') : sel.appendChild(brek);
        rat == null ? document.getElementById('searchRating') : rat.appendChild(opt1);
        rat == null ? document.getElementById('searchRating') : rat.appendChild(lineB);
        setCount(cou + 1);
    }
    const clearFields = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var sel = document.getElementById('searchDepartments');
        var rat = document.getElementById('searchRating');
        if (cou > 0) { 
        for (let i = 0; i < 2; i++) {
            sel?.removeChild(sel.lastElementChild);
            rat?.removeChild(rat.lastElementChild);
            setCount(cou - 1);
        }
    }
}
const submit = (e: { preventDefault: () => void; }) => {
    console.log("Started");
    e.preventDefault();
    {
        var total = 0;
        for (let i = 0; i < li.length; i++) {
            total += parseInt(li[i].wattage);
        }
       if(total!=100){
           alert("Total Wattage should be 100%");
           return;
       }
        const arr = [];
        if(li!=undefined){
			for (let i=0;i<li.length;i++) {
				var obj = {
					Id: li[i].id,
                    LevelId: li[i].levelId,
                    Name: li[i].name,
                    Wattage: li[i].wattage
				}
				arr.push(obj)
			}
        }
        console.log(arr);
        fetch('https://localhost:44369/api/Task/Update', {
            method: 'PATCH',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arr),
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
                alert("Rating Submitted Successfully");
                    // props.history.push("./");
                    var sel = document.getElementById('searchDepartments');
                    var rat = document.getElementById('searchRating');
                    while (sel?.firstChild && rat?.firstChild) {
                        sel?.removeChild(sel.firstChild);
                        rat?.removeChild(rat.firstChild);
                    }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
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
        <div className="text-center col-6 mx-auto"><br /><br />
            <h3>Welcome !!</h3><br />
            <form onSubmit={submit}>
                <br />
                <button button-type='submit' className="btn btn-primary " onClick={DeptCreate}>Department Create</button> &nbsp;
                <button button-type='submit' className="btn btn-primary " onClick={EmpCreate}>Employee Create</button> &nbsp;
                <button button-type='submit' className="btn btn-primary " onClick={updateLevelOne}>Edit Products </button> &nbsp;
                <button button-type='submit' className="btn btn-primary " onClick={updateLevelTwo}>Edit Deliverables </button> <br /> <br />
                <h3>Edit Company Details</h3><br />
                <div className="col-sm-12">
                    <div className="row">
                        {products &&
                            <div className="col-sm-6 form-group">
                                <label>Product Name <mark className="highlightedText">*</mark></label>
                                <select name="product" className="form-control" value={product.id} onChange={(event) => handleChange(event.target.value)}>
                                    {products.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null; }, key: React.Key | null) => {
                                        return <option key={key} value={e.id}>{e.name}</option>;
                                    })}
                                </select>
                            </div>
                        }
                        {deliverables &&
                            <div className="col-sm-6 form-group">
                                <label>Deliverable Name <mark className="highlightedText">*</mark></label>
                                <select name="deliverable" className="form-control" value={deliverable.id} onChange={(event) => handleChange1(event.target.value)}>
                                    {deliverables.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null; }, key: React.Key | null) => {
                                        return <option key={key} value={e.id}>{e.name}</option>;
                                    })}
                                </select>
                            </div>
                        }
                    </div>

                    <div className="row">
                        {tasks1 &&
                            <div id="searchDepartments" className="col-sm-6 form-group">
                                <br />
                            </div>
                        }

                        {tasks1 &&
                            <div id="searchRating" className="col-sm-2 form-group">

                                <br />
                            </div>
                        }
                        <br />

                    </div>

                    <br />
                    <div className="row">
                        {tasks1 &&
                            <div className="col-sm-2 form-group">
                                <button type="submit" className="btn btn-primary" onClick={addFields}>Add</button> &nbsp; &nbsp;
                            </div>
                        }
                        {tasks1 &&
                            <div className="col-sm-2 form-group">
                                <button type="submit" className="btn btn-primary" onClick={clearFields}>Clear</button> &nbsp; &nbsp;
                            </div>
                        }
                        <div className="col-sm-2 form-group">
                            <button type="submit" className="btn btn-primary" >Submit</button> &nbsp; &nbsp;
                        </div>
                    </div>

                </div>
            </form>
        </div>
        {/* <View>
				<View >
					<Footer />
				</View>
			</View> */}
    </div>
)
}
HrAdminHomePage.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default HrAdminHomePage;