import React, { useEffect, useState } from 'react'
let email: string;
export const ForgotPassword = (props: { history: string[]; }) => {
    const [UserName, setUserName] = useState("");

    const submitAction = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        email = UserName;
        getDeliverables();
    }
    const getDeliverables = () => {
        fetch('https://localhost:44369/api/Password/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
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
                alert("Reset Link Send to the Mail Id !");
                props.history.push(`./ResetPassword/${email}`);
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
                                <a className="nav-link active" aria-current="page" href="./">Home</a>
                            </li> &nbsp; &nbsp;
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
            <div>
            <form onSubmit={submitAction}>
                    <div className="container inputOne text-center">
                        <h3>Forgot Password</h3><br />
                        <label><b>Email Address :</b></label>&nbsp;
                        <input type="text" placeholder="Enter Registered Email Address" name="uname" value={UserName} onChange={(e) => setUserName(e.target.value)} className="formInput" required /><br /><br />
                        <button className="btn btn-primary" type="submit" >Submit</button> &nbsp;
                        <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
ForgotPassword.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default ForgotPassword;