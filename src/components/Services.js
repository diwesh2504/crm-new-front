import React from 'react';
import {connect} from 'react-redux';
import {requestLoadServices, requestAddServices,requestEditServices,requestDeleteServices} from '../actions/servicesActionCreator';
import {useFormik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWrench} from '@fortawesome/free-solid-svg-icons'


const Services=(props)=>{
    const [user,setUser]=React.useState("");
    const [edit_user,setEdit_User]=React.useState([]);
     const [emp_details,setEmp_details]=React.useState({});
    React.useEffect(()=>{
        if(localStorage.length===0){
            props.history.push("/");
        }
        setUser(Object.keys(localStorage).join());
        setEmp_details(JSON.parse(Object.values(localStorage)));
        props.load_initial_services();
    },[])
    const formik=useFormik({
        initialValues:{
            name:'',
            service:'',
            contact_detail:''
        },
        onSubmit:values=>{
            let json={...values,generated_by:emp_details.email,employee_type:user,status:'Created'}
            props.addServices(json);
        }
    });
    let formik_edit=useFormik({
        initialValues:{
            id:'',
            name:'',
            service:'',
            contact_detail:'',
            status:''
        },
        onSubmit:values=>{
            console.log(values);
            props.editServices(values);
        }
    });
    
    const func=(id)=>{
        setEdit_User(props.services.filter((item)=>item._id==id));
        props.services.map((item)=>{
            if(item._id==id){
                formik_edit.initialValues.id=item._id;
                formik_edit.initialValues.name=item.name;
                formik_edit.initialValues.service=item.service;
                formik_edit.initialValues.contact_detail=item.contact_detail;
                formik_edit.initialValues.status=item.status;

            }
            
        })
        
        console.log("initial values on Formik_EDIT",formik_edit.initialValues);
    }
    const handleDelete=(e)=>{
        let idx=e.target.id;
        props.deleteServices(idx);
    }
    
    return (
        <>
        <h4>Services <FontAwesomeIcon icon={faWrench} color="grey"/></h4>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                         <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
             <div className="modal-body">
                    
                        <form >
                        <label htmlFor="name">Name:</label>
                            <input id="name"type="text" className="form-control" onChange={formik_edit.handleChange} value={formik_edit.values.name} ></input>
                        <label htmlFor="service">Service:</label>
                            <input id="service" type="text" className="form-control" onChange={formik_edit.handleChange} value={formik_edit.values.service} ></input>
                        <label htmlFor="contact_detail">Contact Detail:</label>
                            <input id="contact_detail" type="text" className="form-control" onChange={formik_edit.handleChange} value={formik_edit.values.contact_detail} ></input>
                        <label htmlFor="status">Status:</label>
                            <select id="status" className="form-control" onChange={formik_edit.handleChange} value={formik_edit.values.status}>
                            
                                            <option selected>..</option>
                                            <option>Open</option>
                                            <option>In-Process</option>
                                            <option>Released</option>
                                            <option>Cancelled</option>
                                            <option>Completed</option>
                                        
                            </select>
                        <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={formik_edit.handleSubmit}>Save changes</button>
                        </form>
                    
             </div>
             
            </div>
         </div>
        </div>
        <div style={{marginTop:"15px"}}>
                        <h6>Create Service</h6>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-row">
                                <div className="col">
                                    <input type="text" className="form-control" id="name" placeholder="Enter Client Name..." onChange={formik.handleChange} value={formik.values.name}></input>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" id="service" placeholder="Enter Service Details.." onChange={formik.handleChange} value={formik.values.service}></input>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" id="contact_detail" placeholder="Enter Contact Details.." onChange={formik.handleChange} value={formik.values.contact_detail}></input>
                                </div>
                                <button type="submit" className="btn btn-outline-success">Create</button>
                            </div>
                        </form>
                    </div>
                    
                    <div style={{marginTop:"20px"}}>
                        <h6>Current Services</h6>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Sl.No</th>
                                <th scope="col">Service For</th> 
                                <th scope="col">Details</th>
                                <th scope="col">Edit Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.services.map((item,index)=>{
                               return( <tr id={item._id}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.service}</td>
                                    <td style={{fontWeight:"bold",textAlign:"center"}}>{item.status}
                                        
                                    </td>
                                    <td><button id={item._id}className="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#exampleModal" onClick={(e)=>func(e.target.id)} >Edit</button>
                                    <button id={item._id} className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    </div>
        </>
    )
}
const mapStateToProps=(state)=>{
    return {
        services:state.services
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        load_initial_services:()=>dispatch(requestLoadServices()),
        addServices:(item)=>dispatch(requestAddServices(item)),
        editServices:(temp)=>dispatch(requestEditServices(temp)),
        deleteServices:(id)=>dispatch(requestDeleteServices(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Services);