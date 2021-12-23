import { tsBigIntKeyword } from '@babel/types';
import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { View } from 'react-native';
import Department from '../model/Department';
import { Text, VStack, Center, NativeBaseProvider } from "native-base";
import Footer from './Footer';
import Header from './Header';
let li: [];
var ratName: any;	var isTrueSet: boolean;
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
	const [managerRating, setManagerRating] = useState<any>();
	let empid: any;

	const submitBack1 = (e: { preventDefault: () => void; }) => {
		if (localStorage.getItem('userType') == "4") {
			props.history.push("/EmployeeHomePage");
		} else
			props.history.push("/EmployeeRating");
	}
	useEffect(() => {
		isTrueSet = (props.match.params.isManager === 'true');
		empid = props.match.params.id;
		setEmployeeId(empid);
		console.log("empid", empid);
		(async () => {
			if (localStorage.getItem('userType') == "3" || localStorage.getItem('userType') == "4") {
				var sel = document.getElementById('submitBack');
				var btn = document.createElement('BUTTON');
				btn.innerHTML = "Back";
				btn.className = "btn btn-primary";
				btn.onclick = submitBack1;
				sel?.appendChild(btn);
				// flag = false;
			}
			var employeeData = await getEmployeeData();
			// var tasks = await getTasks();

		})()

	}, [])

	const getEmployeeData = () => {
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
		fetch('https://localhost:44369/api/Rating/rating-names/' + empid, httpGetObject)
			.then(response => response.json())
			.then(data => {
				if (data[0].name != null) {
					setRatingName(data[0].name);
					setRatingNames(data);
					ratName = data[0].name;
					getTasks();
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
		token = localStorage.getItem('token');
		requestHeaders.set('Authorization', token || "");
		requestHeaders.set('Content-Type', 'application/json');
		let httpGetObject = {
			method: 'GET',
			headers: requestHeaders
		}
		fetch('https://localhost:44369/api/Rating/list-by-empId-ratingName/' + empid + '/' + ratName, httpGetObject)
			.then(response => response.json())
			.then(data => {
				if (data.status == 404) {
					console.log("Data Not Found");
					var olddata = document.getElementById("searchDepartments");
					var rat = document.getElementById('searchRating');
					var manRating = document.getElementById('managerRating');
					while (olddata?.firstChild && rat?.firstChild && manRating?.firstChild) {
						olddata?.removeChild(olddata.firstChild);
						rat?.removeChild(rat.firstChild);
						manRating?.removeChild(manRating.firstChild);
					}
					setCompany(null);
					setProduct(null);
					setDeliverable(null);

				} else if (data != undefined) {
					setCompany(data.buName);
					setProduct(data.levelOneName);
					setDeliverable(data.levelTwoName);
					setTask(data.ratingReponseList[0].taskName)
					setTaskData(data.ratingReponseList)
					setRating(data.ratingReponseList[0].empRating);
					setRatingData(data.ratingReponseList);
					setManagerRating(data.ratingReponseList[0].managerRating)
					// setRatingName(ratingName);
					var sel = document.getElementById('searchDepartments');
					var rat = document.getElementById('searchRating');
					var man = document.getElementById('managerRating');
					// while (sel?.firstChild || rat?.firstChild || man?.firstChild) {
					//     sel?.removeChild(sel.firstChild);
					// 	rat?.removeChild(rat.firstChild);
					// 	man?.removeChild(man.firstChild);
					// }
					li = data.ratingReponseList;
					var opt = null; var opt1 = null; var opt2 = null; let lineB = null; let brek = null; let brek1 = null; var label1; var label2; var label3; let count = 0;
					for (let i = 0; i < data.ratingReponseList.length; i++) {
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
						opt1.setAttribute("max", "5");
						opt1.setAttribute("min", "0");
						opt1.className = "form-control";
						opt.className = "form-control";
						opt2.setAttribute("type", "number");
						opt2.setAttribute("max", "5");
						opt2.setAttribute("min", "0");
						opt2.className = "form-control";
						opt.id = data.ratingReponseList[i].taskId;
						opt.value = data.ratingReponseList[i].taskName;
						opt.innerHTML = data.ratingReponseList[i].taskName;
						opt1.id = data.ratingReponseList[i].ratingId;
						opt1.value = data.ratingReponseList[i].empRating;
						opt1.innerHTML = data.ratingReponseList[i].empRating;
						opt2.id = data.ratingReponseList[i].ratingId;
						opt2.value = data.ratingReponseList[i].mangerRating;
						opt2.innerHTML = data.ratingReponseList[i].mangerRating;
						opt.setAttribute('readonly', 'true')
						isTrueSet ? opt1.setAttribute('readonly', 'true') : null
						count == 0 ? (sel == null ? document.getElementById('searchDepartments') : sel.appendChild(label1)) : count++;
						sel == null ? document.getElementById('searchDepartments') : sel.appendChild(opt);
						sel == null ? document.getElementById('searchDepartments') : sel.appendChild(brek);
						count == 0 ? (rat == null ? document.getElementById('searchRating') : rat.appendChild(label2)) : count++;
						rat == null ? document.getElementById('searchRating') : rat.appendChild(opt1);
						rat == null ? document.getElementById('searchRating') : rat.appendChild(lineB);
						rat == null ? document.getElementById('managerRating') : rat.addEventListener("change", updateValue1);
						if(isTrueSet){
						count == 0 ? (man == null ? document.getElementById('managerRating') : isTrueSet ? man.appendChild(label3) : null) : count++;
						man == null ? document.getElementById('managerRating') : isTrueSet ? man.appendChild(opt2) : null;
						man == null ? document.getElementById('managerRating') : man.addEventListener("change", updateValue);
						man == null ? document.getElementById('managerRating') : man.appendChild(brek1);
						}
						setEmployeeId(empid);
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
	function updateValue(e: { target: { value: any; id: any }; }) {
		var arrray1 = li;
		for (let userObject of arrray1) {
			console.log(userObject);
			if (userObject.ratingId == e.target.id) {
				let index = arrray1.indexOf(userObject);
				li?.splice(index, 1);
				userObject.mangerRating = parseInt(e.target.value);
				li?.push(userObject);
			}
		}
	}
	function updateValue1(e: { target: { value: any; id: any }; }) {
		var arrray1 = li; let checkBol = true
		for (let userObject of arrray1) {
			console.log(userObject);
			if (userObject.ratingId == e.target.id) {
				let index = arrray1.indexOf(userObject);
				li?.splice(index, 1);
				userObject.empRating = parseInt(e.target.value);
				li?.push(userObject);
				checkBol = false;
			}
		}
	}
	const handleChange = (id: string) => {
		setRatingName(id);
		setEmployeeId(employeeId);
		empid = employeeId;
		ratName = id;
		var sel = document.getElementById('searchDepartments');
		var rat = document.getElementById('searchRating');
		var man = document.getElementById('managerRating');
		while (sel?.lastChild && rat?.lastChild) {
			sel?.removeChild(sel.lastChild);
			rat?.removeChild(rat.lastChild);
			if(isTrueSet){
			man?.removeChild(man.lastChild);
			}
		}
		getTasks();
		setProduct(product);
		setDeliverable(deliverable);

	}
	const submit = (e: { preventDefault: () => void; }) => {
		console.log("Started");
		e.preventDefault();
		{
			let collection: never[] = [];
			console.log("Started");
			const arr = [];
			if (li != undefined) {
				for (let i = 0; i < li.length; i++) {
					var obj = {
						id: li[i].ratingId,
						taskId: li[i].taskId,
						empId: employeeId,
						rating: li[i].empRating,
						name: li[i].taskName,
						managerRating: li[i].mangerRating,
					}
					arr.push(obj)
				}
			}
			console.log(arr);
			var bearer = localStorage.getItem('token');
			fetch('https://localhost:44369/api/Rating/Update', {
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
					li = [];
					if (localStorage.getItem('userType') == "4") {
						props.history.push("/EmployeeHomePage");
					} else
						props.history.push("/EmployeeRating");
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
				<div className="container">
					<h1 className="well text-center">Welcome !</h1>
					<NativeBaseProvider >
						<VStack space={1}>
							<Text style={[{ color: "green" }]} fontSize="xs"><b>Rating 1 : Poor </b>|  <b>2 : Below Expectations </b>|  <b>3 : Meets Expectations </b>| <b>4 : Exceed Expecations </b>|  <b>5 : Outstanding </b></Text>
						</VStack>
					</NativeBaseProvider>
				</div>
				<div className="col-lg-12 well">
					<div className="row">
						<form onSubmit={submit}>
							<div className="col-sm-12">
								<div className="row">
									{employeeData &&
										<div id="test">

										</div>
									}
									{
										ratingNames &&
										<div className="col-sm-4 form-group">
											<label>Rating Name </label>
											<select name="ratingName" className="form-control" value={ratingName.name} onChange={(event) => handleChange(event.target.value)}>
												{ratingNames.map((e: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
										</div>
									}
								</div>
								<div className="row">
									{company &&
										<div className="col-sm-4 form-group">
											<label>Company Name</label>
											<input type="text" readOnly className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} />
										</div>
									}
									{product &&
										<div className="col-sm-4 form-group">
											<label>Product Name </label>
											<input type="text" readOnly className="form-control" value={product} onChange={(e) => setProduct(e.target.value)} />
										</div>
									}
									{deliverable &&
										<div className="col-sm-4 form-group">
											<label>Deliverable Name </label>
											<input type="text" readOnly className="form-control" value={deliverable} onChange={(e) => setDeliverable(e.target.value)} />
										</div>
									}
								</div>

								<div className="row">
									{
										<div id="searchDepartments" className="col-sm-5 form-group">
											<br />
										</div>
									}

									{
										<div id="searchRating" className="col-sm-2 form-group">
											<br />
										</div>
									}
									{
										<div id="managerRating" className="col-sm-2 form-group">
											<br />
										</div>
									}
									<br />
								</div>
								<br />

								<div className="row">
									{company &&
										<div className="col-sm-2 form-group">
											<button type="submit" className="btn btn-primary" >Submit</button> &nbsp; &nbsp;
										</div>
									}
									<div id="submitBack" className="col-sm-2 form-group">

									</div>
								</div>
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
