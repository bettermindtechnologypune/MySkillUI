import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';

export const EmployeeRating = (props: { history: any[]; }) => {
  const [EmpList, setEmpList] = useState<any>();
  const [searchText, setSearchText] = React.useState<any>();
  useEffect(() => {
    (async () => {
      var EmployeeList = await getEmployeeList();
    })()

  }, [])
  const getEmployeeList = () => {
    const requestHeaders: HeadersInit = new Headers();
    let token;
    token = localStorage.getItem('token');
    requestHeaders.set('Authorization', token || "");
    requestHeaders.set('Content-Type', 'application/json');
    let ManagerId = localStorage.getItem('empId');
    let httpGetObject = {
      method: 'GET',
      headers: requestHeaders
    }
    fetch('https://localhost:44369/api/Employee/' + ManagerId, httpGetObject)
      .then(response => {
        if (response.status == 200)
          return response.json()
        else {
          console.log(response)
          var noData = document.getElementById("noData");
          var para = document.createElement("P");               
          para.innerText = "No data Found";               
          noData == null ? document.getElementById("noData") : noData.appendChild(para);
          throw new Error("Unauthorized")
        }
      })
      .then(data => {
        if (data != undefined) {
          setEmpList(data.results)
          return data;
        } else {
          console.log("No data Found")
          var noData = document.getElementById("noData");
          var para = document.createElement("h1");               
          para.innerText = "No data Found";               
          noData == null ? document.getElementById("noData") : noData.appendChild(para);
          return null;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const getListViewItem = (item: { key: any; }) => {
    props.history.push(`./ManagerRating/${item}`);
  }

  const submitBack = (e: { preventDefault: () => void; }) => {
    props.history.push("/ManagerHomePage");
  }
  const handleChange = (id: string) => {
    setSearchText(id);
  }
  const searchOption = () => {
    alert(searchText);
    props.history.push("/ManagerHomePage");
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
      <div className="text-right  col-8 mx-auto">
        <input type="text" placeholder="Search Here" value={searchText} onChange={(event) => handleChange(event.target.value)} /> &nbsp;
        <button button-type='submit' className="btn btn-primary btn-sm" onClick={searchOption}>Search</button>
      </div>
      <div className="text-center col-6 mx-auto"><br /><br />
        <h3>Welcome !!</h3><br />

        <form >
        <div className="row">
              {
              <div id ="noData" className="col-sm-12 form-group text-center">
              <br />
              </div>
              }
              </div>
          {EmpList &&
            <div className="row">
              <div className="col-md-12">
                <table className="col-md-12 table table-bordered table-hover table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Employee Code</th>
                    </tr>
                  </thead>
                  <tbody>

                    {EmpList.map((emp: { Id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => (
                      <tr onClick={getListViewItem.bind(this, emp.id)} style={{ borderBottom: '1px solid black' }} className="text-left">
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.orgEmpId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             
            </div>
          }
          <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
        </form>
      </div>
    </div>
  )
}
EmployeeRating.defaultProps = {
  title: "Skill Base",
  searchBar: true
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(195,204,213)',
    textAlign: 'left',
  }
}
);
export default EmployeeRating;

function state(arg0: string, state: any, orgEmpId: any) {
  throw new Error('Function not implemented.');
}
