import React from 'react';
import { requestLoadUsers, requestEditUsers } from '../actions/userActionsCreator';
import {connect} from 'react-redux';

const ManageEmployee=(props)=>{
    React.useEffect(()=>{
        props.load();
    },[props.users])
    const handleChange=(e)=>{
            let idx=e.target.id;
            let s=e.target.value;
            props.edit(idx,s)
    }
    return (
        <>
        <div className="alert alert-warning" role="alert">
            Note:Only Admins can grant access to Employees
            
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Current Status</th>
                <th scope="col">Manage</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((item,idx)=>{
                
                  return (
                    <tr key={idx}>
                        <td>{item.firstname}&nbsp;{item.lastname}</td>
                        <td>{item.status}</td>
                        <td><select id={item._id} onChange={handleChange}>
                                <option selected>..</option>
                                <option >Active</option>
                                <option>Terminate</option>
                            </select></td>
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
        users:state.users

    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        load:()=>dispatch(requestLoadUsers()),
        edit:(id,str)=>dispatch(requestEditUsers(id,str))
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(ManageEmployee)