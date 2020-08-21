import React from 'react';
import {connect} from 'react-redux';
import {requestLoadServices} from '../actions/servicesActionCreator';
import {requestLoadLeads} from '../actions/leadsActionsCreator';
import { requestLoadContacts } from '../actions/contactsActionCreator';
const Dashboard=(props)=>{
    React.useEffect(()=>{
        props.loadLeads();
        props.loadServices();
        props.loadContacts();
    },[])
    return (
        <>
        <div className="alert alert-warning" role="alert">
            Only Admins can see this Page.
        </div>
        <h5>Total Leads:{props.leads.length}</h5>
        <table className="table table-sm " style={{marginTop:"15px"}}>
            <thead className="thead-light">
                 <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Contact Details</th>
                    <th scope="col">Generated By</th>
                    <th scope="col">User Type</th>
                </tr>
            </thead>
            <tbody>
                {props.leads.map((item,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{item.lead_name}</td>
                            <td>{item.lead_status}</td>
                            <td>{item.lead_contact}</td>
                            <td>{item.generated_by}</td>
                            <td>{item.employee_type}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
        <h5 style={{marginTop:"10px"}}>Total Services:{props.services.length} </h5>
        <table className="table table-sm" style={{marginTop:"15px"}}>
            <thead className="thead-light">
                 <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Details of Service Offered</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Contact Details</th>
                    <th scope="col">Generated By</th>
                    <th scope="col">User Type</th>
                </tr>
            </thead>
            <tbody>
                {props.services.map((item,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{item.name}</td>
                            <td>{item.service}</td>
                            <td>{item.status}</td>
                            <td>{item.contact_detail}</td>
                            <td>{item.generated_by}</td>
                            <td>{item.employee_type}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
        <h5 style={{marginTop:"10px"}}>Contacts</h5>
        <table className="table table-sm" style={{marginTop:"15px"}}>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Sl No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                    
                                </tr>

                            </thead>
                            <tbody>
                                {props.contacts.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone_no}</td>
                                            <td>{item.email}</td>
                                            
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
        services:state.services,
        contacts:state.contacts
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        loadServices:()=>dispatch(requestLoadServices()),
        loadLeads:()=>dispatch(requestLoadLeads()),
        loadContacts:()=>dispatch(requestLoadContacts())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);