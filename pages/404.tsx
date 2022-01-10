import React from 'react';
import { View} from 'react-native';
import Header from "./Header";
import Footer from './Footer';
const NotFoundPage = (props: { history: string[]; }) => {
    const submit = (e: { preventDefault: () => void; }) => {
        props.history.push("/");
    }
    return (
        <div>

<nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">My Skill</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="./">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
            <div className="text-center col-6 mx-auto">
                <br /><br /><br />
                <h2>404 Page Not Found</h2><br /><br /><br />
                <button button-type='submit' className="btn btn-primary" onClick={submit}>Back</button>
            </div>
            <View>
                <View >
                    <Footer />
                </View>
            </View>
        </div>
    )
}

export default NotFoundPage;