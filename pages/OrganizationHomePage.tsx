import React from 'react';
import logo from "../emp2.png";
import { View } from 'react-native';
import Footer from "./Footer";
import Header from './Header';
export const OrganizationHomePage = (props: { history: string[]; }) => {
    const CreateBusinessUnit = (e: { preventDefault: () => void; }) => {
        props.history.push(`./BusinessUnitCreate`);
    }
    const SkillIndexGraph = (e: { preventDefault: () => void; }) => {
        props.history.push("./SkillIndexChart");
    }

    return (
        <div>
            <View>
                <View >
                    <Header />
                </View>
            </View>
            <div className="text-center col-6 mx-auto"><br /><br />
                <h3>Welcome to Home page</h3><br />
                <form >
                    {/* <div className="imgcontainer">
          <img src={logo} alt="Avatar" className="avatar1" />
        </div> */}
                    <br /><br />
                    <button button-type='submit' className="btn btn-primary " onClick={CreateBusinessUnit} >Create Business Unit</button> &nbsp;
                    <button button-type='submit' className="btn btn-primary " onClick={SkillIndexGraph}>Businessunit wise Skill Index</button>
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
OrganizationHomePage.defaultProps = {
    title: "Skill Base",
    searchBar: true
}
export default OrganizationHomePage;