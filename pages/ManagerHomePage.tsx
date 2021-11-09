import React from 'react'

export const ManagerHomePage = (props: { history: string[]; }) => {
    const EmpRecognition = (e: { preventDefault: () => void; }) => {
        props.history.push("./EmployeeRecognition");
    }
    const EmpRating = (e: { preventDefault: () => void; }) => {
        props.history.push("./EmployeeRating");
    }
    
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
    <h3>Welcome to Home page</h3><br />
    <form >
   <br /><br />
  <button button-type='submit' className= "btn btn-primary " onClick = {EmpRecognition} >Self Rating</button> &nbsp;
  <button button-type='submit' className= "btn btn-primary " onClick  = {EmpRating}>Employee Rating</button>
</form>
    </div>
    </div>
)
}
ManagerHomePage.defaultProps = {
  title: "Skill Base",
  searchBar: true
}
export default ManagerHomePage;