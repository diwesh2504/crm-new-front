import React from 'react';
import {connect} from 'react-redux';
import {useFormik} from 'formik';
import { requestLoadContacts, requestAddContacts, requestDeleteContacts } from '../actions/contactsActionCreator';
const Contacts=(props)=>{
    React.useEffect(()=>{
        props.load()
    },[props.contacts])
    const formik=useFormik({
        initialValues:{
            name:'',
            phone_no:'',
            email:''
        },
        onSubmit:values=>{
            props.add(values)
            
        }
    })
    const handleDelete=(e)=>{
        props.delete(e.target.id);
    }
return (
    <>
    <h5>Contacts</h5>
    <h6>Create Contact</h6>
                        <form onSubmit={formik.handleSubmit} >
                            <div className="form-row">
                                <div className="col">
                                    <input type="text" className="form-control" id="name" onChange={formik.handleChange} placeholder="Enter Name.."></input>
                                </div>
                                <div className="col">
                                <input type="text" className="form-control" id="phone_no" onChange={formik.handleChange} placeholder="Enter Phone No.."></input>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" id="email" onChange={formik.handleChange} placeholder="Enter Email ID.."></input>
                                </div>
                                <button className="btn btn-outline-success" onClick={formik.handleSubmit} >Create</button>
                            </div>
                        </form>
                        <table className="table" style={{marginTop:"10px"}}>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Sl No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
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
                                            <td><button id={item._id} className="btn btn-outline-danger btn-sm" onClick={(e)=>handleDelete(e)}>Delete</button></td>
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
        contacts:state.contacts
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        load:()=>dispatch(requestLoadContacts()),
        add:(item)=>dispatch(requestAddContacts(item)),
        delete:(id)=>dispatch(requestDeleteContacts(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Contacts);