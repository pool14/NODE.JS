import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () =>{
    return (
<div>
  <div className="wrapper">
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          < Link to={"#"} className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to={"/"} className="nav-link">Salir</Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"#" }className="nav-link" data-widget="fullscreen" role="button">
            <i className="fas fa-expand-arrows-alt" />
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  </div>
  );

  }

  export default Navbar;


