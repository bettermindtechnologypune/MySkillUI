import React, { useState } from 'react'
import { View } from 'react-native';
import Footer from './Footer';
import Header from "./Header";
import * as XLSX from "xlsx";
export const UploadXMLFile=(props: { history: any[]; }) => {
  const [items, setItems] = useState([]);

  const readExcel = (file: Blob) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      if(!Validate(file)){
        return;
      }

      fileReader.onload = (e) => {
 
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  const submit = (e: { preventDefault: () => void; }) => {
    Validate(e)
  }

  var _validFileExtensions = [".xlsx"];    
  function Validate(oForm: { preventDefault?: () => void; getElementsByTagName?: any; }) {
          var oInput = oForm;
              var sFileName = oInput.name;
              if (sFileName.length > 0) {
                  var blnValid = false;
                  for (var j = 0; j < _validFileExtensions.length; j++) {
                      var sCurExtension = _validFileExtensions[j];
                      if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                          blnValid = true;
                          break;
                      }
                  }
                  
                  if (!blnValid) {
                      alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                      return false;
                  }
              }    
      return true;
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
    <div className="text-center col-6 mx-auto">
    <h3>Select XML file to upload</h3><br />
    <form onSubmit={submit}>
      &nbsp; <input
        type="file" className="text-center uploadFile"
        onChange={(e: { preventDefault: () => void; }) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      
     
<br />
      <table className="text-center table container">
        <thead>
          <tr>
            <th className= "text-center" scope="col">Item</th>
            <th className= "text-center" scope="col">Description</th>
            <th className= "text-center" scope="col">Remark</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d: { Item: {} | null | undefined; Description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; Remark: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;}) => (
            <tr key={d.Item}>
              <th>{d.Item}</th>
              <td>{d.Description}</td>
              <td>{d.Remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </form>
      <br /> <br />
      <button button-type='submit' className="btn btn-primary">Submit</button>
    </div>
    <View>
                <View >
                    <Footer />
                </View>
            </View>
    </div>
  );
}

export default UploadXMLFile;

UploadXMLFile.defaultProps = {
  title: "Skill Base",
  searchBar: true
}