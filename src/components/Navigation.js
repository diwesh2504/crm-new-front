import React from 'react';
import {connect} from 'react-redux';
import {setView} from '../actions/viewActionCreator';
const box="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
const Navigation =(props)=>{
    const [user,setUser]=React.useState({});
    React.useEffect(()=>{
        setUser(JSON.parse(Object.values(localStorage)));
    },[])
    
    return (
        <div className="card-body">
        <div className="btn-group-vertical" >
            <button className="btn btn-outline-success" style={{marginTop:"10px",boxShadow:box,borderRadius:"10%"}} onClick={()=>props.setView("dashboard")} disabled={user.type==="employee" ? true:false} data-placement="left" data-toggle="tooltip" title="For Admins Only">Main Dashboard</button>
            <button className="btn btn-outline-success" style={{marginTop:"10px",boxShadow:box,borderRadius:"10%"}} onClick={()=>props.setView("emp-dash")} disabled={user.type==="employee" ? false:true}> Employee Dashboard</button>
            <button className="btn btn-outline-success" style={{marginTop:"10px",boxShadow:box,borderRadius:"10%"}} onClick={()=>props.setView("leads")}>Leads</button>
            <button className="btn btn-outline-success" style={{marginTop:"10px",boxShadow:box,borderRadius:"10%"}} onClick={()=>props.setView("contacts")}>Contacts</button>
            <button className="btn btn-outline-success" style={{marginTop:"10px",boxShadow:box,borderRadius:"10%"}} onClick={()=>props.setView("services")}>Services</button>
            <button className="btn btn-outline-success" style={{marginTop:"10px",boxShadow:box,borderRadius:"10%"}} onClick={()=>props.setView("manage") } disabled={user.type==="employee" ? true:false} data-placement="left" data-toggle="tooltip" title="For Admins Only">Manage Employees</button>
        </div>
        </div>
        
    )
}

const matchDispatchToProps=(dispatch)=>{
    return {
        setView:(view)=>dispatch(setView(view))

    }
}

export default connect(null,matchDispatchToProps)(Navigation);