import React, { FC, ChangeEvent } from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';

export const BusinessUnitCreate = (props: { history: string[]; title: string; state: string; }) => {
	const [organizationName, setOrganizationName] = useState("");
	const [orgEmail, setOrgEmail] = useState("");
	const [billingEmail, setBillingEmail] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [stateName, setStateName] = useState("");
	const [zip, setZipCode] = useState("");
	const [phone, setPhoneNumber] = useState("");
	const [website, setWebsite] = useState("");
	const submit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (!organizationName && !orgEmail && !address && !billingEmail) {
			alert("Title or Description can not be blank..")
		} else {
			let collection = {};
			collection.Name = organizationName,
				collection.Email = orgEmail,
				collection.BillingEmail = billingEmail,
				collection.CompanyAddress = address,
				collection.City = city,
				collection.State = stateName,
				collection.PostalCode = zip,
				collection.ContactNumber = phone,
				collection.Website = website,
				console.log(collection);
			var bearer = localStorage.getItem('token');
			fetch('https://localhost:44369/api/BusinessUnit/Create', {
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
					alert("Successfully Created Businessunit!");
					props.history.push("./");
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

			<div className="container">
				<h1 className="well">Business Unit Registration Form</h1>
				<div className="col-lg-12 well">
					<div className="row">
						<form onSubmit={submit}>
							<div className="col-sm-12">
								<div className="row">
									<div className="col-sm-4 form-group">
										<label>Business Unit Name <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter Business Unit Name Here.." required value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Business Unit Email Address <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter Email Address Here.." required value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Billing Email Address <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter Billing Email Address Here.." required value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} className="form-control" />
									</div>
								</div>
								<div className="form-group">
									<label>Business Unit Address <mark className = "highlightedText">*</mark></label>
									<input type="text" placeholder="Enter Business Unit Address Here.." required value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
								</div>
								<div className="row">
									<div className="col-sm-4 form-group">
										<label>City <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter City Name Here.." required value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>State <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter State Name Here.." required value={stateName} onChange={(e) => setStateName(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Postal Code <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter Postal Code Here.." required value={zip} onChange={(e) => setZipCode(e.target.value)} className="form-control" />
									</div>
								</div>
								<div className="row">
									<div className="col-sm-4 form-group">
										<label>Contact Number <mark className = "highlightedText">*</mark></label>
										<input type="text" placeholder="Enter Contact Number Here.." required value={phone} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Website</label>
										<input type="text" placeholder="Enter Website Name Here.." value={website} onChange={(e) => setWebsite(e.target.value)} className="form-control" />
									</div>
								</div><br />
								<button type="submit" className="btn btn-primary" >Submit</button>
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
export default BusinessUnitCreate;
BusinessUnitCreate.defaultProps = {
	title: "Skill Base",
	searchBar: true
}
