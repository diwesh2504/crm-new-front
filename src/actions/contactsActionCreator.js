const loadContacts=(data)=>{
    return {type:"LOAD_CONTACTS",payload:data}
}
const addContacts=(data)=>{
    return {type:"ADD_CONTACTS",payload:data}
}
const deleteContacts=(id)=>{
    return {type:"DELETE_CONTACTS",payload:id}
}
export const requestLoadContacts=()=>{
    return (dispatch)=>{
        fetch("https://crm-backend-new.herokuapp.com/getcontacts")
        .then(res=>res.json())
        .then(data=>dispatch(loadContacts(data)))
        .catch(err=>console.log("Couldnt Load Contacts"))
    }

}

export const requestAddContacts=(item)=>{
    return (dispatch)=>{
    fetch('https://crm-backend-new.herokuapp.com/addcontacts',{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>dispatch(addContacts(data)))
        .catch(err=>console.log("Couldnt Add Contacts"))
    }
}

export const requestDeleteContacts=(id)=>{
    return (dispatch)=>{
        fetch(`https://crm-backend-new.herokuapp.com/deletecontacts/${id}`)
        .then(res=>res.json())
        .then(data=>{
            dispatch(deleteContacts(id))
            console.log(data);
        })
        .catch(err=>console.log("Couldnt Delete Contacts"));
    }
}