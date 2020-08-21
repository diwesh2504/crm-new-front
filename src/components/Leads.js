import React from 'react';
import {requestAddLeads,requestLoadLeads, requestEditLeads, requestDeleteLeads} from '../actions/leadsActionsCreator';
import {connect} from 'react-redux';
import {useFormik} from 'formik';

const Leads=(props)=>{
    const [user_type,setUser_Type]=React.useState("");
    const [emp_details,setEmp_details]=React.useState({});
    React.useEffect(()=>{
        if(localStorage.length!==0){
            
            setUser_Type(Object.keys(localStorage).join());
            props.loadLeads();
            
            setEmp_details(JSON.parse(Object.values(localStorage)));

        }
    },[])
    const handleDelete=(e)=>{
        
        const idx=e.target.id;
        console.log(idx);
        props.deleteLeads(idx);
    }
    const handleModify=(e)=>{
        console.log(`select${e.target.id}`)
        let select=document.getElementById(`${e.target.id}`);
        let edit_id=select.parentNode.parentNode.id;
        let edit_value=select.value;
        props.editLeads(edit_id,edit_value);
       
        
    }
    const formik=useFormik({
        initialValues:{
            lead_name:'',
            lead_status:'',
            lead_contact:'',

        },
        onSubmit:values=>{
            let json={...values,generated_by:emp_details.email,employee_type:emp_details.type}
            console.log("Add Lead",json)
            props.addLeads(json);
            
            
        },
        
        
    })
    
    return (
        <>
        <div style={{marginTop:"5px"}}>
                        <h5>Leads</h5>
                        <h6>Create Lead</h6>
                        <form onSubmit={formik.handleSubmit} >
                            <div className="form-row">
                                <div className="col">
                                    <input type="text" className="form-control" id="lead_name" onChange={formik.handleChange} placeholder="Enter Lead Name.."></input>
                                </div>
                                <div className="col">
                                    
                                    <select id="lead_status" className="form-control" onChange={formik.handleChange}>
                                            <option selected>Select Status..</option>
                                            <option>Contacted</option>
                                            <option>Qualified</option>
                                            <option>Cancelled</option>
                                            <option>Confirmed</option>
                                            <option>Lost</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" id="lead_contact" onChange={formik.handleChange} placeholder="Enter Contact Details.."></input>
                                </div>
                                <button className="btn btn-outline-success" onClick={formik.handleSubmit} >Create</button>
                            </div>
                        </form>
                    </div>
                    <div style={{marginTop:"5px"}}>
                        <h6>View Leads</h6>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Sl No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Current Status</th>
                                    <th scope="col">Modify Status</th>
                                    <th scope="col">Actions</th>
                                </tr>

                            </thead>
                            <tbody>
                                {props.final_leads.map((item,index)=>{
                                    return(
                                        <tr key={index} id={item._id}>
                                            <td>{index+1}</td>
                                            <td>{item.lead_name}</td>
                                            <td>{item.lead_status}</td>
                                            <td>
                                            
                                            <select className="form-control form-control-sm" id={`select${index}`} onChange={handleModify}>
                                                    <option selected>Choose</option>
                                                    <option>Contacted</option>
                                                    <option>Qualified</option>
                                                     <option>Cancelled</option>
                                                    <option>Confirmed</option>
                                                    <option>Lost</option></select>
                                            </td>
                                            <td><button id={item._id} className="btn btn-outline-danger btn-sm" onClick={(e)=>handleDelete(e)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    </>
    )

}

const mapStateToProps=(state)=>{
    return{
        final_leads:state.leads
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loadLeads:()=>dispatch(requestLoadLeads()),
        addLeads:(item)=>dispatch(requestAddLeads(item)),
        editLeads:(id,str)=>dispatch(requestEditLeads(id,str)),
        deleteLeads:(id)=>dispatch(requestDeleteLeads(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Leads);