import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Department from '../model/Department';
import Footer from './Footer';
import Header from './Header';

export class EmployeeRecognitionResource {

    public Name: string | undefined;

}
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
	const submitBack = (e: { preventDefault: () => void; }) => {
		props.history.push("/");
	}
	useEffect(() => {
		(async () => {
			var companies = await getCompanies();
			var products = await getProducts();
			if(product != undefined){
			var deliverables = await getDeliverables();
			}
			if(deliverable != undefined){
			var tasks = await getTasks();
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
					setCompany(data[0].id)
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
		let buid = '5877e370-aa1d-45bc-b139-6c13258c4da7';
		let httpGetObject = {
			method: 'GET',
			headers: requestHeaders
		}
		fetch('https://localhost:44369/api/LevelOne/'+ buid,httpGetObject)
			.then(response => response.json())
			.then(data => {
				if (data != undefined) {
					setProduct(data[0].id)
					setProductData(data)
					if(product != undefined){
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
		let LevelOneId = '664db8cd-456d-4ea2-bc3d-7706bc5c90da';
		let httpGetObject = {
			method: 'GET',
			headers: requestHeaders
		}
		fetch('https://localhost:44369/api/LeveTwo/'+product, httpGetObject)
			.then(response => response.json())
			.then(data => {
				if (data.status == 400){
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
		fetch('https://localhost:44369/api/Task/'+deliverable, httpGetObject)
			.then(response => response.json())
			.then(data => {
				if(data.status == 404){
					console.log("Data Not Found");
					var olddata=document.getElementById("searchDepartments");
					var rat = document.getElementById('searchRating');
					while (olddata?.firstChild && rat?.firstChild) {
						olddata?.removeChild(olddata.firstChild);
						rat?.removeChild(rat.firstChild);
					  }
				}else if (data.status == 400){
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
					var opt = null;var opt1 = null; var lineB = null; let brek = null; var label1; var label2; let count = 0;
					for(let i = 0; i<data.length; i++){
						lineB = document.createElement("br");
						brek = document.createElement("br");
						label1 = document.createElement("LABEL");
						label1.innerHTML = "Task Name :  ";
						label2 = document.createElement("LABEL");
						label2.innerHTML = "Rating :  ";
						opt = document.createElement('input');
						opt.setAttribute("value", "rating")
						opt1 = document.createElement('input');
						opt1.setAttribute("type", "number");
						opt1.setAttribute("max" , "5");
						opt1.setAttribute( "min" , "0");
						opt1.className = "form-control";
						opt.className = "form-control";
						opt.value = data[i].name;
						opt.innerHTML = data[i].name;
						count == 0 ? (sel == null ? document.getElementById('searchDepartments')	: sel.appendChild(label1)) : count++;				
    					sel == null ? document.getElementById('searchDepartments') : sel.appendChild(opt);
						sel == null ? document.getElementById('searchDepartments') : sel.appendChild(brek);
						count == 0 ? (rat == null ? document.getElementById('searchDepartments')	: rat.appendChild(label2)) : count++;		
						rat == null ? document.getElementById('searchRating')  : rat.appendChild(opt1);
						rat == null ? document.getElementById('searchRating') : rat.addEventListener("change", updateValue);
						rat == null ? document.getElementById('searchRating')  : rat.appendChild(lineB);
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
	function updateValue(e: { target: { value: any; }; }) {
		ratings = e.target.value;
	  }
	const handleChange = (id: string) => {
		setCompany(id);
		setProduct(id);
		if(product != undefined){
		getDeliverables();
		setDeliverable(id);
		}
		if(deliverable != undefined){
		getTasks();
		setTask(id);
		}
		setRating(ratings);
		
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
			collection.Task = task,
			// collection.push(col);
			console.log(collection);
			var bearer = localStorage.getItem('token');
			fetch('https://localhost:44369/api/Department/Create', {
				method: 'POST',
				headers: {
					'Authorization': localStorage.getItem('token'),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(collection),
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
					alert("Successfully Added Departement")
					props.history.push("./HrAdminHomePage");
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	}
	return (
		<div>
			<View>
				<View >
					<Header />
				</View>
			</View>

			<div className="container">
				<h1 className="well text-center">Welcome !</h1>
				<div className="col-lg-12 well">
					<div className="row">
						<form onSubmit={submit}>
							<div className="col-sm-12">
								<div className="row">
									
									{companies &&
										<div className="col-sm-4 form-group">
											<label>Company Name</label>
											<input type="text" readOnly className="form-control" value = {"TCS"}/>
										</div>
									}
									{products &&
										<div className="col-sm-4 form-group">
											<label>Product Name <mark className = "highlightedText">*</mark></label>
											<select name="product" className="form-control" value={product.id} onChange={(event) => handleChange(event.target.value)}>
												{products.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null ; }, key: React.Key | null ) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
										</div>
									}
									{deliverables &&
										<div className="col-sm-4 form-group">
											<label>Deliverable Name <mark className = "highlightedText">*</mark></label>
											<select name="deliverable" className="form-control" value={deliverable.id} onChange={(event) => handleChange(event.target.value)}>
												{deliverables.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null ; }, key: React.Key | null ) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
										</div>
									}
									</div>
							
									<div className="row">
									{tasks &&
								<div id = "searchDepartments" className="col-sm-5 form-group">
                                        {/* <label>Task Name<mark className = "highlightedText">*</mark></label> */}
										<br />
                                    </div>
									}
								
									{ tasks &&
									<div id="searchRating" className="col-sm-2 form-group">
										
                                        {/* <label>Rating <mark className = "highlightedText">*</mark></label> */}
                                        {/* <input type="number" min="0" max="5" placeholder="Enter 0 to 5 Rating Here.."  className="form-control"/> */}
										<br />
									</div>
									}
									<br />
									</div>
								<br />
								{/* <div className="text-center">  */}
								<button type="submit" className="btn btn-primary" >Submit</button> &nbsp; &nbsp;
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

export default EmployeeRecognition;
EmployeeRecognition.defaultProps = {
	title: "Skill Base",
	searchBar: true
}
