import { tsBigIntKeyword } from '@babel/types';
import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Text, VStack, Center, NativeBaseProvider } from "native-base";
import { View } from 'react-native';
import Footer from './Footer';
const map1 = new Map();
var btn: HTMLElement | null = null;

export const EmployeeRecognition = (props: { history: string[]; title: string; state: string; }) => {
	const [companies, setCompanyData] = useState<any>();
	const [company, setCompany] = useState<any>();
	const [products, setProductData] = useState<any>();
	const [product, setProduct] = useState<any>();
	const [deliverables, setDeliverableData] = useState<any>();
	const [deliverable, setDeliverable] = useState<any>();
	const [tasks, setTaskData] = useState<any>();
	const [task, setTask] = useState<any>();
	const [rating, setRating] = useState<any>();
	var ratings = 0;
	const submitBack1 = (e: { preventDefault: () => void; }) => {
		if (localStorage.getItem('userType') == "3") {
			props.history.push("/ManagerHomePage");
		} else if (localStorage.getItem('userType') == "4") {
			props.history.push("/EmployeeHomePage");
		}
	}
	useEffect(() => {
		(async () => {
			if (localStorage.getItem('userType') == "3" || localStorage.getItem('userType') == "4") {
				var sel = document.getElementById('submitBack');
				btn = document.createElement('BUTTON');
				btn.innerHTML = "Back";
				btn.className = "btn btn-primary";
				btn.onclick = submitBack1;
				sel?.appendChild(btn);
			}
			var companies = await getCompanies();
			var products = await getProducts();
			if (product != undefined) {
				var deliverables = await getDeliverables();
			}
			if (deliverable != undefined) {
				var tasks1 = await getTasks();
			}
		})()

	}, [])
	const getCompanies = () => {
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
					setCompany(localStorage.getItem('buName'));
					setCompanyData(data)
					return data;
				} else {
					return null;
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
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
						label1.innerHTML = "Task Name :  ";
						label2 = document.createElement("LABEL");
						label2.innerHTML = "Rating :  ";
						opt = document.createElement('input');
						opt1 = document.createElement('input');
						opt1.setAttribute("type", "number");
						opt1.setAttribute("max", "5");
						opt1.setAttribute("min", "0");
						opt1.className = "form-control";
						opt.className = "form-control";
						opt.id = data[i].id;
						opt.value = data[i].name;
						opt.innerHTML = data[i].name;
						opt1.id = data[i].id;

						count == 0 ? (sel == null ? document.getElementById('searchDepartments') : sel.appendChild(label1)) : count++;
						sel == null ? document.getElementById('searchDepartments') : sel.appendChild(opt);
						sel == null ? document.getElementById('searchDepartments') : sel.appendChild(brek);
						count == 0 ? (rat == null ? document.getElementById('searchDepartments') : rat.appendChild(label2)) : count++;
						rat == null ? document.getElementById('searchRating') : rat.appendChild(opt1);
						rat == null ? document.getElementById('searchRating') : rat.addEventListener("change", updateValue);
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
	function updateValue(e: { target: { value: any; id: any }; }) {

		var rat = document.getElementById('searchRating');
		map1.set(e.target.id, e.target.value);
	}
	const handleChange = (id: string) => {
		setCompany(localStorage.getItem('buName'));
		setProduct(id);
		if (product != undefined) {
			getDeliverables();
		}

	}
	const handleChange1 = (id: string) => {
		setDeliverable(id);

		if (deliverable != undefined) {
			getTasks();
			setTask(id);
		}
		setRating(ratings);
	}
	const submit = (e: { preventDefault: () => void; }) => {
		console.log("Started");
		e.preventDefault();
		{
			const arr = [];
			for (const [key, value] of map1.entries()) {
				var obj = {
					taskid: key,
					empId: localStorage.getItem('empId'),
					rating: value,
					isManagerRating: false
				}
				arr.push(obj)
				console.log(key, value);
			}
			console.log(arr);
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
					if (btn == null) {
						props.history.push("./");
					} else {
						if (localStorage.getItem('userType') == "3") {
							props.history.push("/ManagerHomePage");
						} else if (localStorage.getItem('userType') == "4") {
							props.history.push("/EmployeeHomePage");
						}
					}
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	}
	const submitBack = (e: { preventDefault: () => void; }) => {
		props.history.push("/EmployeeHomePage");
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

									{companies &&
										<div className="col-sm-4 form-group">
											<label>Company Name</label>
											<input type="text" readOnly className="form-control" value={company} />
										</div>
									}
									{products &&
										<div className="col-sm-4 form-group">
											<label>Product Name <mark className="highlightedText">*</mark></label>
											<select name="product" className="form-control" value={product.id} onChange={(event) => handleChange(event.target.value)}>
												{products.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null; }, key: React.Key | null) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
										</div>
									}
									{deliverables &&
										<div className="col-sm-4 form-group">
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
									{tasks &&
										<div id="searchDepartments" className="col-sm-5 form-group">
											<br />
										</div>
									}

									{tasks &&
										<div id="searchRating" className="col-sm-2 form-group">

											<br />
										</div>
									}
									<br />
								</div>
								<br />
								<div className="row">
									<div className="col-sm-2 form-group">
										<button type="submit" className="btn btn-primary" >Submit</button> &nbsp; &nbsp;
									</div>
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

export default EmployeeRecognition;
EmployeeRecognition.defaultProps = {
	title: "Skill Base",
	searchBar: true
}
