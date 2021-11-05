import React, { FC, ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';

export class DepartmentResource {

	public Name: string | undefined;

}
// import logo from './images/superAdmin.png';
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
	function displayFun() {
		a = document.getElementById("demo");
		var btn = document.createElement("LABEL");
		btn.innerHTML = "Department Name : ";
		a.appendChild(btn); <br />;
		var inp = document.createElement("INPUT");
		inp.setAttribute("type", "text");
		a.appendChild(inp);

	}
	const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
    }
	return (
		<div>
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
									{/* <div className="col-sm-4 form-group ">
									<input type="button" value="+" onClick={displayFun} className="btn btn-info" ></input>
								</div> */}
									<div id="demo" className="col-sm-4 form-group"> <br /></div>
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
