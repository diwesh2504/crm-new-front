import React from 'react';
import {connect} from 'react-redux';
import {requestLoadServices} from '../actions/servicesActionCreator';
import {requestLoadLeads} from '../actions/leadsActionsCreator';
const EmpDashboard=(props)=>{
    const [user,setUser]=React.useState({});
    React.useEffect(()=>{
        setUser(JSON.parse(Object.values(localStorage)))
        props.loadLeads();
        props.loadServices();
    },[])
    return (
        <>
        <div className="alert alert-warning" role="alert">
            This Page Shows Individual Work of Employees.
        </div>
        <h4>Leads </h4>
        <table className="table">
            <thead className="thead-light">
                 <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Contact Details</th>
                    
                </tr>
            </thead>
            <tbody>
                {props.leads.map((item,idx)=>{
                    if(item.generated_by==user.email)
                    return(
                        <tr key={idx}>
                            <td>{item.lead_name}</td>
                            <td>{item.lead_status}</td>
                            <td>{item.lead_contact}</td>
                            
                        </tr>
                    )
                })}
            </tbody>

        </table>
        <h4>Services</h4>
        <table className="table">
            <thead className="thead-light">
                 <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Details of Service Offered</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Contact Details</th>
                   
                </tr>
            </thead>
            <tbody>
                {props.services.map((item,idx)=>{
                    if(item.generated_by==user.email)
                    return(
                        <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.service}</td>
                            <td>{item.status}</td>
                            <td>{item.contact_detail}</td>
                            
                        </tr>
                    )
                })}
            </tbody>

        </table>
        </>
    )
}
const mapStateToProps=(state)=>{
    return {
        leads:state.leads,
        services:state.services
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        loadServices:()=>dispatch(requestLoadServices()),
        loadLeads:()=>dispatch(requestLoadLeads())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmpDashboard);