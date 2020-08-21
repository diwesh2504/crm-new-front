const loadUsers=(data)=>{
    return {type:"LOAD_USERS",payload:data}

}
const addUsers=(item)=>{
    return {type:"ADD_USERS",payload:item}
}
const editUsers=(id,str)=>{
    let json={id,str}
    return {type:"EDIT_USERS",payload:json}
}
export const requestLoadUsers=()=>{
    return (dispatch)=>{
        fetch('https://crm-backend-new.herokuapp.com/getusers')
        .then(res=>res.json())
        .then(data=>dispatch(loadUsers(data)))
        .catch(err=>console.log("Couldnt Load Users to FE"))
    }
}
export const requestAddUsers=(item)=>{
    return (dispatch)=>{
    fetch('https://crm-backend-new.herokuapp.com/addusers',{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>dispatch(addUsers(data)))
    }
}
export const requestEditUsers=(id,status)=>{
    return (dispatch)=>{
        fetch('https://crm-backend-new.herokuapp.com/editusers',{
            method:"POST",
            body:JSON.stringify({
                id,
                status
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=> dispatch(editUsers(data._id,data.status)))
        .catch(err=>console.log("Couldnt Edit"))
    }
}