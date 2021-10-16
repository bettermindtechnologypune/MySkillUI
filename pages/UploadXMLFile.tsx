import React from 'react'
import { View } from 'react-native';
import Footer from './Footer';
import Header from "./Header";
export const UploadXMLFile = (props: { history: string[]; }) => {
return(
    <div>
    <View>
      <View >
        <Header />
    </View>
   </View>
    <div className="text-center col-6 mx-auto"><br /><br />
    <h3>Select XML file to upload</h3><br />
    <form >
    <div className="text-center col-6 mx-auto">
  <input type="file" id="myfile" name="myfile" className="uploadFile"/>
  </div><br /><br />
  <button button-type='submit' className= "btn btn-primary">Submit</button>
</form>
    </div>
    <View>
                <View >
                    <Footer />
                </View>
            </View>
    </div>
)
}
UploadXMLFile.defaultProps = {
  title: "Skill Base",
  searchBar: true
}
export default UploadXMLFile;