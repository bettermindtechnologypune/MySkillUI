import React, { useEffect, useState } from 'react'
import ChangePasswordModel from '../model/ChangePasswordModel';
let email: string; let userCode: string; let password: string;
export const ChangePassword = (props: { history: string[]; }) => {
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");


    const submitAction = (e: { preventDefault: () => void; }) => {
        if (newPassword != newConfirmPassword) {
            alert("New Password Doesn't Match")
            return;
        }
        console.log("Started");
        e.preventDefault();
        password = newPassword;
        getPassword(e);
    }
    const getPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let collection: ChangePasswordModel = new ChangePasswordModel();
        collection.resetCode = null,
            collection.email = null,
            collection.newPassword = newPassword,
            collection.userId = localStorage.getItem('userId');
        collection.isFirstTimeChange = true;
        console.log(collection);
        fetch('https://localhost:44369/api/Password/change-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json; charset=UTF-8 ',
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
                alert("Password Changed Successfully !");
                props.history.push("/");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/");
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
                                <a className="nav-link active" aria-current="page" href="/">Logout</a>
                            </li> &nbsp; &nbsp;
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"> About </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <form onSubmit={submitAction}>
                <div className="container inputOne text-center">
                    <h3>Change Password</h3><br />
                    <div className="container inputOne text-center">
                        <label><b>New Password  :</b></label><br />
                        <input type="password" placeholder="Enter New Password Here" name="pwd" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="formInput" required /><br /><br />
                        <label><b>Confirm New Password  :</b></label><br />
                        <input type="text" placeholder="Enter New Password Here" name="pwd" value={newConfirmPassword} onChange={(e) => setNewConfirmPassword(e.target.value)} className="formInput" required /><br /><br />

                    </div>
                    <button className="btn btn-primary" type="submit" >Submit</button> &nbsp;
                    <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
                </div>
            </form>
        </div>
    )
}
ChangePassword.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default ChangePassword;

