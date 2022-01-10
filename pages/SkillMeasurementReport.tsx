import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';import Header from './Header';
 let url: string;
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
    if (url != undefined) {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `SkillMeasurementReport.xlms`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode != null ? link.parentNode.removeChild(link) : null;
    } else {
      alert("No data found to download")
    }
  }
  return (
    <div>
      <View>
        <View >
          <Header />
        </View>
      </View>
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

