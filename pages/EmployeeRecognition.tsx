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
	const [rating, setRating] = useState("");
	const submitBack = (e: { preventDefault: () => void; }) => {
		props.history.push("/");
	}
	useEffect(() => {
		(async () => {
			var companies = await getCompanies();
			var products = await getProducts();
			var deliverables = await getDeliverables();
			var tasks = await getTasks();
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
					getDeliverables();
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
				if (data != undefined) {
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
				if (data != undefined) {
					setTask(data[0].id)
					setTaskData(data)
					var sel = document.getElementById('searchDepartments');
					var rat = document.getElementById('searchRating');
					var opt = null; var opt1 = null;
					for(let i = 0; i<data.length; i++){
						opt = document.createElement('option');
						opt1 = document.createElement('input');
						opt.value = data[i].id;
						opt.innerHTML = data[i].name;
    					sel.appendChild(opt);
						rat.appendChild(opt1);
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
	const handleChange = (id: string) => {
		setCompany(id);
		setProduct(id);
		getDeliverables();
		setDeliverable(id);
		getTasks();
		setTask(id);
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
											<select name="company" className="form-control" value={company.id} onChange={(event) => handleChange(event.target.value)}>
												{companies.map((e: { Id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null ; }, key: React.Key | null ) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
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
								<div className="col-sm-4 form-group">
                                        <label>Task Name<mark className = "highlightedText">*</mark></label>
                                        <select id="searchDepartments" className="form-control"></select>
                                    </div>
									}
									{ tasks &&
									<div className="col-sm-4 form-group">
                                        <label>Rating <mark className = "highlightedText">*</mark></label>
                                        <input type="number" min="0" max="5" placeholder="Enter 0 to 5 Rating Here.." id="searchRating" className="form-control"/>
                                    </div>
									}
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
