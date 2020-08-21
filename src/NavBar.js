import React from "react";
import { BrowserRouter as Router, Switch, Route, Link ,useHistory} from "react-router-dom";
import {faLaptop} from'@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./components/AdminPage";
import EmployeeView from "./components/EmployeeView";
const NavBar = () => {
  const history=useHistory();
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <li className="nav-link"><FontAwesomeIcon icon={faLaptop} />CRM</li>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            </ul>
        </div>
      </nav>
      <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/adminview" component={AdminPage}/>
          <Route path="/employeeview" component={EmployeeView}/>
      </Switch>
    </Router>
  );
};

export default NavBar;
