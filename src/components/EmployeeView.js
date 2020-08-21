import React from 'react';
import Leads from './Leads';
import Services from './Services';
import Navigation from './Navigation';

import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import ManageEmployee from './ManageEmployee';
import EmpDashboard from './EmpDashboard';
import Contacts from './Contacts';
const EmployeeView=(props)=>{
    const [currentUser,setCurrentUser]=React.useState({});
    
    React.useEffect(()=>{
        if(localStorage.length!==0){
            
            setCurrentUser(JSON.parse(localStorage.getItem("employee")));
        }
        if(localStorage.length==0){
            props.history.push("/");
        }

    },[])
    
    
    const handleLogout=()=>{
        localStorage.clear();
        props.history.push("/");
    }
    
    
    return (
      <>
      
        <h1>Welcome,{currentUser.firstname}!</h1>
        <div class="alert alert-primary" role="alert" style={{textAlign:"center"}}>
          Logged in as Employee
          <span className="float-right"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></span>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-3">
                    
                <Navigation/>
                </div>
                <div className="col-8">
                    {props.views==="leads"?<Leads/>:""}
                    {props.views==="dashboard"?<Dashboard/>:""}
                    {props.views==="services" ? <Services/>:""}
                    {props.views==="manage" ? <ManageEmployee/>:""}
                    {props.views==="emp-dash" ? <EmpDashboard/>:""}
                    {props.views==="contacts"?<Contacts/>:""}
                </div>
            </div>
        </div>
        
      </>
    );
}
const mapStateToProps=(state)=>{
    return {
        views:state.view
    }
}

export default connect(mapStateToProps,null)(EmployeeView);