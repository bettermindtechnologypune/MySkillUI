import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, FlatList, StyleSheet, Text } from 'react-native';
import Header from "./Header";
import DepartmentCreate from "./DepartmentCreate";
import EmployeeCreate from "./EmployeeCreate";
// import styles from ".../styles";
export const EmployeeRating = (props: { history: string[]; }) => {
         const [EmpList, setEmpList] = useState<any>();let counter = 0;
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
          fetch('https://localhost:44369/api/Employee/'+ManagerId, httpGetObject)
            .then(response => response.json())
            .then(data => {
              if (data != undefined) {
                setEmpList(data.results)
                return data;
              } else {
                return null;
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        const getListViewItem = (item: { key: any; }) => {  
          alert(item.firstName);  
          localStorage.setItem('empId', (item.id));
          props.history.push("./ManagerRating", item); 
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
    <h3>Welcome !!</h3><br />
    <form >
    <View style = {styles.container}>
      <FlatList 
      data = {EmpList}
      renderItem={({item}) => (
        <View style={{height: 30}}>
         <Text style={item} onPress={getListViewItem.bind(this, item)}>{"First Name : " +item.firstName + " |" + " Last Name : " + item.lastName + " |" + " Employee ID : " + item.orgEmpId}</Text> 
         <View style={{height: 1,backgroundColor:'gray'}}></View>
         </View>
      )}
      />

     
    </View>
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
