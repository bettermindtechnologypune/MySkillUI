import React from 'react'
import { View } from 'react-native';
import Header from "./Header";
import DepartmentCreate from "./DepartmentCreate";
import EmployeeCreate from "./EmployeeCreate";
export const HrAdminHomePage = (props: { history: string[]; }) => {
return(
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
    <div className="text-center col-6 mx-auto"><br /><br />
    <h3>Welcome HR Admin</h3><br />
    <form >
   <br /><br />
  <button button-type='submit' className= "btn btn-primary " formAction="./DepartmentCreate" >Department Create</button> &nbsp;
  <button button-type='submit' className= "btn btn-primary " formAction="./EmployeeCreate">Employee Create</button>
</form>
    </div>
    </div>
)
}
HrAdminHomePage.defaultProps = {
  title: "Skill Base",
  searchBar: true
}
export default HrAdminHomePage;