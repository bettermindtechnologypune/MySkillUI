import { tsBigIntKeyword } from '@babel/types';
import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Department from '../model/Department';
import Footer from './Footer';
import Header from './Header';
const map1 = new Map();
var ratName : any;
export class EmployeeRecognitionResource {

    public Name: string | undefined;

}
export const ManagerRating = (props: { history: string[]; title: string; state: string; }) => {
    const [employeeData, setEmployeeData] = useState<any>();
	const [companies, setCompanyData] = useState<any>();
	const [company, setCompany] = useState<any>();
	const [products, setProductData] = useState<any>();
	const [product, setProduct] = useState<any>();
	const [deliverables, setDeliverableData] = useState<any>();
	const [deliverable, setDeliverable] = useState<any>();
	const [tasks, setTaskData] = useState<any>();
	const [task, setTask] = useState<any>();
	const [rating, setRating] = useState<any>();
	const [ratings, setRatingData] = useState<any>();
	const [ratingNames, setRatingNames] = useState<any>()
	const [ratingName, setRatingName] = useState<any>()
	const [employeeId, setEmployeeId] = useState<any>();
	let empid :any;
	
	const submitBack1 = (e: { preventDefault: () => void; }) => {
		props.history.push("/EmployeeRating");
	}
	useEffect(() => {
		const windowUrl = window.location.search;
		let params = new URLSearchParams(windowUrl).get("Id");
		empid = props.match.params.id;
		setEmployeeId(empid);
		console.log("empid", empid);
		(async () => {
            if(localStorage.getItem('userType') == "3"){
				var sel = document.getElementById('submitBack');
				var btn = document.createElement('BUTTON');
				btn.innerHTML = "Back";
				btn.className = "btn btn-primary";
				btn.onclick = submitBack1;
				sel?.appendChild(btn);
				// flag = false;
			}
			var employeeData = await getEmployeeData();
			var tasks = await getTasks();
	
		})()

	}, [])

    const getEmployeeData = () =>{
        const requestHeaders: HeadersInit = new Headers();
		let token;
		token = localStorage.getItem('token');
        // var empId = localStorage.getItem('empId');
		requestHeaders.set('Authorization', token || "");
		requestHeaders.set('Content-Type', 'application/json');

		let httpGetObject = {
			method: 'GET',
			headers: requestHeaders
		}
		fetch('https://localhost:44369/api/Rating/rating-names/'+empid, httpGetObject)
			.then(response => response.json())
			.then(data => {
				if (data[0].name != null) {
					setRatingName(data[0].name);
					setRatingNames(data);
					ratName = data[0].name;
					getTasks();
					// setCompany(data.result[0].buName);
                    // setProduct(data.result[0].levelOneName);
                    // setDeliverable(data.result[0].levelTwoName);
					// setDeliverableData(data.result[0].levelTwoId);
					// // setTask(data.result[0].taskName);
					// setRating(data.result[0].empRating);
					// getTasks();
					return data;
				} else {
                    alert("No data Found");
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
		let parametr = empid + '/' + ratName;
		token = localStorage.getItem('token');
		requestHeaders.set('Authorization', token || "");
		requestHeaders.set('Content-Type', 'application/json');
		let httpGetObject = {
			method: 'GET',
			headers: requestHeaders
		}
		fetch('https://localhost:44369/api/Rating/list-by-empId-ratingName/'+empid+'/'+ratName, httpGetObject)
			.then(response => response.json())
			.then(data => {
				if(data.result == null){
					console.log("Data Not Found");
					
				}else if (data != undefined) {
					setCompany(data.result.buName);
					setProduct(data.result.levelOneName);
					setDeliverable(data.result.levelTwoName);
					setTask(data.result.ratingReponseList[0].taskName)
					setTaskData(data.result.ratingReponseList)
					setRating(data.result.ratingReponseList[0].empRating);
					setRatingData(data.result.ratingReponseList);
					var sel = document.getElementById('searchDepartments');
					var rat = document.getElementById('searchRating');
					var man = document.getElementById('managerRating');
					var opt = null;var opt1 = null; var opt2 = null; let lineB = null; let brek = null; let brek1 = null; var label1; var label2; var label3; let count = 0;
					for(let i = 0; i<data.result.ratingReponseList.length; i++){
						lineB = document.createElement("br");
						brek = document.createElement("br");
						brek1 = document.createElement("br");
						label1 = document.createElement("LABEL");
						label1.innerHTML = "Task Name :  ";
						label2 = document.createElement("LABEL");
						label2.innerHTML = "Employee Rating :  ";
						label3 = document.createElement("LABEL");
						label3.innerHTML = "Manager rating :  ";
						opt = document.createElement('input');
						opt1 = document.createElement('input');
						opt2 = document.createElement('input');
						opt1.setAttribute("type", "number");
						opt1.setAttribute("max" , "5");
						opt1.setAttribute( "min" , "0");
						opt1.setAttribute("step", ".1")
						opt1.className = "form-control";
						opt.className = "form-control";
						opt2.setAttribute("type", "number");
						opt2.setAttribute("max" , "5");
						opt2.setAttribute( "min" , "0");
						opt2.setAttribute("step", ".1")
						opt2.className = "form-control";
						opt.id = data.result.ratingReponseList[i].taskId;
						opt.value = data.result.ratingReponseList[i].taskName;
						opt.innerHTML = data.result.ratingReponseList[i].taskName;
						opt1.id = data.result.ratingReponseList[i].empRating;
						opt1.value = data.result.ratingReponseList[i].empRating;
						opt1.innerHTML = data.result.ratingReponseList[i].empRating;
						opt2.id = data.result.ratingReponseList[i].taskId;
						count == 0 ? (sel == null ? document.getElementById('searchDepartments')	: sel.appendChild(label1)) : count++;				
    					sel == null ? document.getElementById('searchDepartments') : sel.appendChild(opt);
						sel == null ? document.getElementById('searchDepartments') : sel.appendChild(brek);
						count == 0 ? (rat == null ? document.getElementById('searchRating')	: rat.appendChild(label2)) : count++;		
						rat == null ? document.getElementById('searchRating')  : rat.appendChild(opt1);
						rat == null ? document.getElementById('searchRating')  : rat.appendChild(lineB);
						count == 0 ? (man == null ? document.getElementById('managerRating')	: man.appendChild(label3)) : count++;
						man == null ? document.getElementById('managerRating')  : man.appendChild(opt2);
						man == null ? document.getElementById('managerRating') : man.addEventListener("change", updateValue);
						man == null ? document.getElementById('managerRating')  : man.appendChild(brek1);
						setEmployeeId(empid);
						count ++;
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
	function updateValue(e: { target: { value: any; id : any}; }) {
		
		var rat = document.getElementById('managerRating');
		map1.set(e.target.id, e.target.value);
	  }
	const handleChange = (id: string) => {
		setRatingName(id);
        setEmployeeData(id);
		getTasks();
		// }
		// setRating(ratings);
		
	}
	const submit = (e: { preventDefault: () => void; }) => {
		console.log("Started");
		e.preventDefault();
		{
			let collection: never[] = [];
			console.log("Started");
			collection.Company = company,
			collection.Product = product,
			collection.Deliverable = deliverable,
			collection.Task = tasks;
			collection.Rating = ratings;
			// collection.push(col);
			var sel = document.getElementById('searchDepartments');
			var rat = document.getElementById('searchRating');
			var d = null;
			var count = sel.childElementCount;
			map1;
			const arr = [];
			for (const [key, value] of map1.entries()) {
				var obj = {
					taskid : key,
					empId : employeeId,
					ManagerRating: value,
					isManagerRating : true
				}
				arr.push(obj)
				console.log(key, value);
			  }
			console.log(arr);
			var bearer = localStorage.getItem('token');
			fetch('https://localhost:44369/api/Rating/CreateList', {
				method: 'POST',
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
					props.history.push("./EmployeeRating");
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
                                {/* <Link to = "./AdminLogin">Home</Link> */}
                                <a className="nav-link active" aria-current="page" href="http://localhost:19006/">Logout</a>
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
				<h1 className="well text-center">Welcome !</h1>
				<div className="col-lg-12 well">
					<div className="row">
						<form onSubmit={submit}>
							<div className="col-sm-12">
								<div className="row">
									{
                                        employeeData &&
                                        <div id = "test">

                                        </div>
                                    }
									{
										ratingNames && 
										<div className="col-sm-4 form-group">
										<label>Rating Name </label>
										<select name="ratingName" className="form-control" value={ratingName.name} onChange={(event) => handleChange(event.target.id)}>
											{ratingNames.map((e: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => {
												return <option key={key} value={e.id}>{e.name}</option>;
											})}
										</select>
									</div>
									}
									</div>
									<div className="row">
									{	
										<div className="col-sm-4 form-group">
											<label>Company Name</label>
											<input type="text" className="form-control" value = {company} onChange={(e) => setCompany(e.target.value)}/>
										</div>
									}
									{ 
										<div className="col-sm-4 form-group">
											<label>Product Name </label>
											<input type="text" className="form-control" value = {product} onChange={(e) => setProduct(e.target.value)}/>
										</div>
									}
									{ 
										<div className="col-sm-4 form-group">
											<label>Deliverable Name </label>
											<input type="text"  className="form-control" value = {deliverable} onChange={(e) => setDeliverable(e.target.value)}/>
										</div>
									}
									</div>
							
									<div className="row">
									{
								<div id = "searchDepartments" className="col-sm-5 form-group">
                                        {/* <label>Task Name<mark className = "highlightedText">*</mark></label> */}
										<br />
                                    </div>
									}
								
									{ 
									<div id="searchRating" className="col-sm-2 form-group">
										
                                        {/* <label>Rating <mark className = "highlightedText">*</mark></label> */}
                                        {/* <input type="number" min="0" max="5" placeholder="Enter 0 to 5 Rating Here.."  className="form-control"/> */}
										<br />
									</div>
									}
									{ 
									<div id="managerRating" className="col-sm-2 form-group">
										
                                        {/* <label>Rating <mark className = "highlightedText">*</mark></label> */}
                                        {/* <input type="number" min="0" max="5" placeholder="Enter 0 to 5 Rating Here.."  className="form-control"/> */}
										<br />
									</div>
									}
									<br />
									</div>
								<br />
								{/* <div className="text-center">  */}
								<div className="row">
									<div className="col-sm-2 form-group">
								<button type="submit" className="btn btn-primary" >Submit</button> &nbsp; &nbsp;
								</div>
								<div id = "submitBack" className="col-sm-2 form-group">

								</div>
								</div>
								{/* <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button> */}
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

export default ManagerRating;
ManagerRating.defaultProps = {
	title: "Skill Base",
	searchBar: true
}
