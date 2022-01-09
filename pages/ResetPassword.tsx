import React, { useEffect, useState } from 'react'
let email: string; let code: string; let password: string;
export const ResetPassword = (props: { history: string[]; }) => {
    const [codeId, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        email = props.match.params.id;
    }, [])

    const submitAction = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        code = codeId;
        password = newPassword;
        getDeliverables();
    }
    const getDeliverables = () => {
        let collection = {}
        collection.resetCode = code,
            collection.email = email,
            collection.newPassword = newPassword,
            collection.userId = null;
        console.log(collection);

        fetch('https://localhost:44369/api/Password/reset-password', {
            method: 'POST',
            headers: {
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
                alert("Password Reset Successfully !");
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
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
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
            <form onSubmit={submitAction}>
                <div className="container inputOne text-center">
                    <h3>Reset Password</h3><br />
                    <div className="container inputOne text-center">
                        <label ><b>One Time Password:</b></label><br />
                        <input type="text" placeholder="Enter OTP Here" name="uname" value={codeId} onChange={(e) => setCode(e.target.value)} className="formInput" required /> <br /><br />
                        <label><b>New Password  :</b></label><br />
                        <input type="password" placeholder="Enter New Password Here" name="pwd" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="formInput" required /><br /><br />
                    </div>
                    <button className="btn btn-primary" type="submit" >Submit</button> &nbsp;
                    <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
                </div>
            </form>
        </div>
    )
}
ResetPassword.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default ResetPassword;

