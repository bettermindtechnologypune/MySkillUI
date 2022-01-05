import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';let url: string;
export const SkillMeasurementReport = (props: { history: any[]; }) => {
  const [EmpList, setEmpList] = useState<any>();
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
    let buId = localStorage.getItem('buid');
    let httpGetObject = {
      method: 'GET',
      headers: requestHeaders
    }
    fetch('https://localhost:44369/api/Employee/skill-measurement/' + buId, httpGetObject)
      .then(response => {
        if (response.status == 200)
        return response.blob();
        else {
          console.log(response)
          alert("No data Found to download")
          throw new Error("Unauthorized")
        }
      })
      .then(blob => {
        url = window.URL.createObjectURL(new Blob([blob]),);
        return
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const submitBack = (e: { preventDefault: () => void; }) => {
    props.history.push("/HrAdminHomePage");
  }
  const downloadReport = () => {
      if(url!=undefined){
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `SkillMeasurementReport.xlms`,
    );
      document.body.appendChild(link);
      link.click();
      link.parentNode!=null ? link.parentNode.removeChild(link): null;
    }else{
        alert("No data found to download")
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
      <div className="text-center col-6 mx-auto"><br /><br />
        <h4>Click below to download Skill measurement report !!</h4><br />

        <form >          
          <button button-type='submit' className="btn btn-primary" onClick={downloadReport}>Download</button> &nbsp;
          <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
        </form>
      </div>
    </div>
  )
}
SkillMeasurementReport.defaultProps = {
  title: "Skill Base",
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(195,204,213)',
    textAlign: 'left',
  }
}
);
export default SkillMeasurementReport;

function handleChange(value: string): void {

}

