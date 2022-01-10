import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';
import Header from './Header';

export class DepartmentResource {

	public Name: string | undefined;

}
export const DepartmentCreate = (props: { history: string[]; title: string; state: string; }) => {
	const [organizationName, setOrganizationName] = useState("");
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
					alert("Successfully Added Departement");
					props.history.push("./HrAdminHomePage");
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
		<div>
		<View>
				<View >
					<Header />
				</View>
			</View>

			<div className="container">
				<h1 className="well">Department Registration Form</h1>
				<div className="col-lg-12 well">
					<div className="row">
						<form onSubmit={submit}>
							<div className="col-sm-12">
								<div className="row">
									<div id="div1" className="col-sm-6 form-group">
										<label>Department Name : <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter Department Here.." required value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="form-control" />
									</div>
							
									<div id="demo" className="col-sm-4 form-group"> <br /></div>
									<br />
								</div>
								<br />
								<button type="submit" className="btn btn-primary" >Submit</button> &nbsp; &nbsp;
								<button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
							</div>
						</form>
					</div>
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
export default DepartmentCreate;
DepartmentCreate.defaultProps = {
	title: "Skill Base",
	searchBar: true
}
