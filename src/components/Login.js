import React from 'react';

import { requestLoadUsers } from '../actions/userActionsCreator';
import {connect} from 'react-redux';
const Login=(props)=>{

    
    React.useEffect(()=>{
        props.loadUsers();
    },[])
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        let entered_id=document.getElementById("login-email").value;
        let entered_pass=document.getElementById("login-pass").value;
        console.log(entered_id,entered_pass);
        props.users.map((item)=>{
            if(item.email==entered_id && item.password==entered_pass){
                localStorage.setItem(`${item.type}`,JSON.stringify(item))
                if(item.type=="admin")
                    props.history.push("/adminview");
                else if(item.type=="employee")
                {
                    if(item.status=="Terminate")
                    {
                        alert("Access is restricted for you, Please Contact Admin")
                        window.location.reload();
                    }else{
                        props.history.push("/employeeview")
                    }

                    
                }
                    
            }
        })
    }
    return (
        <>
        <h1>Login Page</h1>
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
        <form>
            
            <div className="form-group">
            <label htmlFor="login-email">Email:</label>
            <input type="text" id="login-email" className="form-control" placeholder="Enter email.."></input>
            </div>
            <div className="form-group">
            <label htmlFor="login-pass">Password:</label>
            <input type="password" id="login-pass"className="form-control"  placeholder="Enter Password.."></input>
            </div>
            <button type="submit" onClick={handleSubmit}className="btn btn-primary">Login</button>
        </form>
        </div>
        <div className="col-4"></div>
        </div>
        
        </>
    )
    
}
const mapStateToProps=(state)=>{
    return {
        users:state.users
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loadUsers:()=>dispatch(requestLoadUsers())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);