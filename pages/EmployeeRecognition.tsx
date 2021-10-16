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
	const [departments, setDepartmentData] = useState<any>();
	const [department, setDepartment] = useState<any>();

	const submitBack = (e: { preventDefault: () => void; }) => {
		props.history.push("/");
	}
	useEffect(() => {
		(async () => {
			var departments = await getDepartments();
			var companies = await getCompanies();
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
					setCompany(data[0])
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
	const handleChange = (id: string) => {
		setCompany(id);
		setDepartment(id);
	}
	const submit = (e: { preventDefault: () => void; }) => {
		console.log("Started");
		e.preventDefault();
		{
			let collection = [];
			let col = { "Name": organizationName };
			collection.push(col);
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
												{companies.map((e: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
										</div>
									}
									{departments &&
										<div className="col-sm-4 form-group">
											<label>Department Name</label>
											<select name="department" className="form-control" value={department.id} onChange={(event) => handleChange(event.target.value)}>
												{departments.map((e: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => {
													return <option key={key} value={e.id}>{e.name}</option>;
												})}
											</select>
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
