import React from 'react'
import PropTypes from 'prop-types'
export default function Header(props: { title: string; }) {
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
                <a className="nav-link active" aria-current="page" href="/">Logout</a>
              </li> &nbsp; &nbsp;
              <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#"> About </a>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button className="dropbtn"> Profile Setting <i className="fa fa-caret-down"></i></button>
                  <div className="dropdown-content">
                    <a href="/ChangePassword"> Change Password </a>
                  </div>
                </div>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
Header.defaultProps = {
  title: "Skill Base",
  searchBar: true
}
Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool
}