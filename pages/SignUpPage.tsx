import React, { FC, ChangeEvent } from 'react'
import { useState } from 'react';
import AdminLogin from "./AdminLogin";
import Header from './Header';

// import logo from './images/superAdmin.png';
export const SignUpPage = (props) => {
	const [organizationName, setOrganizationName] = useState("");
	const [orgEmail, setOrgEmail] = useState("");
	const [billingEmail, setBillingEmail] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [multipleBU, setMultipleBU] = useState("")
	const [stateName, setStateName] = useState("");
	const [zip, setZipCode] = useState("");
	const [phone, setPhoneNumber] = useState("");
	const [website, setWebsite] = useState("");
	const submit = (e) => {
		console.log("Started");
		e.preventDefault();
		if (!organizationName && !orgEmail && !address && !billingEmail) {
			alert("Title or Description can not be blank..")
		} else {
			let collection = {}
			var isTrueSet = multipleBU ==='yes' ? true : false ;
				collection.Name = organizationName,
				collection.Email = orgEmail,
				collection.BillingEmail = billingEmail,
				collection.CompanyAddress = address,
				collection.City = city,
				collection.State = stateName,
				collection.PostalCode = zip,
				collection.ContactNumber = phone,
				collection.Website = website,
				collection.HasMultipleBU = isTrueSet,
				console.log(collection);
				var bearer = localStorage.getItem('token');
			fetch('https://localhost:44369/api/Organization/Create', {
				method: 'POST',
				headers: {
					'Authorization': localStorage.getItem('token'),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(collection),
			})
				.then(response => response.json())
				.then(data => {
					if (data.status == 401) {
						console.log('Unauthorized:', data);
						alert("Please enter a valid data")
					} else {
						console.log('Success:', data);
						props.history.push("/pages/", { state: 'AdminLogin' });
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
				<h1 className="well">Registration Form</h1>
				<div className="col-lg-12 well">
					<div className="row">
						<form onSubmit={submit}>
							<div className="col-sm-12">
								<div className="row">
									<div className="col-sm-4 form-group">
										<label>Organization Name</label>
										<input type="text" placeholder="Enter Organization Name Here.." value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Organization Email Address</label>
										<input type="text" placeholder="Enter Email Address Here.." value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Billing Email Address</label>
										<input type="text" placeholder="Enter Billing Email Address Here.." value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} className="form-control" />
									</div>
								</div>
								<div className="form-group">
									<label>Company Address</label>
									<input type="text" placeholder="Enter Company Address Here.." value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
								</div>
								<div className="row">
									<div className="col-sm-4 form-group">
										<label>City</label>
										<input type="text" placeholder="Enter City Name Here.." value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>State</label>
										<input type="text" placeholder="Enter State Name Here.." value={stateName} onChange={(e) => setStateName(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Postal Code</label>
										<input type="text" placeholder="Enter Postal Code Here.." value={zip} onChange={(e) => setZipCode(e.target.value)} className="form-control" />
									</div>
								</div>
								<div className="row">
									
									
									<div className="col-sm-4 form-group">
										<label>Contact Number</label>
										<input type="text" placeholder="Enter Contact Number Here.." value={phone} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Website</label>
										<input type="text" placeholder="Enter Website Name Here.." value={website} onChange={(e) => setWebsite(e.target.value)} className="form-control" />
									</div>
									<div className="col-sm-4 form-group">
										<label>Has Multiple Sub Business Unit</label><br />
										<select name="sbu" className="form-control" value={multipleBU} onChange={(e) => setMultipleBU(e.target.value)} id="sbus">
											<option value="selectOption">Select Here</option>
											<option value="yes">Yes</option>
											<option value="no">No</option>
										</select>
										{/* <input type="text" placeholder="Enter Company Name Here.." className="form-control"/> */}
									</div>
								</div><br />
								{/* <div className="text-center">  */}
								<button type="submit" className="btn btn-lg btn-info" >Submit</button>
								{/* </div> */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
export default SignUpPage;
SignUpPage.defaultProps = {
	title: "Skill Base",
	searchBar: true
}
