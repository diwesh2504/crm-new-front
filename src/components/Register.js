import React from 'react';
import { requestLoadUsers,requestAddUsers} from '../actions/userActionsCreator';
import {connect} from 'react-redux';
import {useFormik} from 'formik';
const Register=(props)=>{
    React.useEffect(()=>{
        if(localStorage.length>0){
            props.history.push("/adminview");
        }
        props.loadUsers();
    },[])
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            type:''
        },
        onSubmit:values=>{
            let flag=0;
            let json={...values,status:'Active'}
            console.log(json);
            props.state.map((item)=>{
                if(item.email==json.email){
                    alert("User Already Exists,try a different email ID..");
                    flag=1;
                    window.location.reload();
                }else{
                    
                }

            })
            if(flag===0){
                props.addUsers(json);
                    alert("User Added Successfully,Login from Login Page");
                    window.location.reload();
            }
        }
    })
    return (
        <>
        <h1>Register Page</h1>
        <div className="row" style={{marginTop:"10px"}}>
            <div className="col-3"></div>
            <div className="col-6">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="firstname" className="col-3 form-label">Enter First Name:</label>
                        <div className="col-sm-6">
                            <input type="text" id="firstname" className="form-control" onChange={formik.handleChange} value={formik.values.firstname} placeholder="Enter First Name.."></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-3 form-label">Enter Last Name:</label>
                        <div  className="col-sm-6">
                        <input type="text" id="lastname" className="form-control" onChange={formik.handleChange} value={formik.values.lastname} placeholder="Enter Lasst Name.."></input>
                            </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-3 form-label">Email ID:</label>
                        <div className="col-sm-6">
                        <input type="text" id="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} placeholder="Enter Valid Email..."></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-3 form-label">Password:</label>
                        <div className="col-sm-6">
                        <input type="password" id="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} placeholder="Enter Password of Your Choice."></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="type" className="col-3 form-label">Type of User</label>
                        <div className="col-sm-6">
                        <select id="type" onChange={formik.handleChange} className="form-control">
                            <option defaultValue>admin</option>
                            <option>employee</option>
                        </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Create User</button>
                </form>
            </div>
        </div>
        </>

    )
}
const mapStateToProps=(state)=>{
    return {
        state:state.users
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loadUsers:()=>dispatch(requestLoadUsers()),
        addUsers:(user)=>dispatch(requestAddUsers(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);