const loadServices=(items)=>{
    return {type:"LOAD_SERVICES",payload:items};
}

const addServices=(items)=>{
    return {type:"ADD_SERVICES",payload:items}
}
const editServices=(item)=>{
    return {type:"EDIT_SERVICES",payload:item}
}

const deleteServices=(id)=>{
    return {type:"DELETE_SERVICES",payload:id}
}

export const requestLoadServices=()=>{
    return (dispatch)=>{
        fetch("https://crm-backend-new.herokuapp.com/getservices")
        .then(res=>res.json())
        .then(data=>{
            dispatch(loadServices(data));
            
        }).catch(err=>console.log("Couldnt get Services to Frontend"))
    }
}

export const requestAddServices=(temp)=>{
    
    return (dispatch)=>{
        console.log("inside req",JSON.stringify(temp));
        fetch("https://crm-backend-new.herokuapp.com/addservices",{
            method:"POST",
            body:JSON.stringify(temp),
            headers:{
                "Content-type":"application/json;charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch(addServices(data))
        }).catch(err=>console.log("Couldnt Add Services from FE to BE"))
        
    }
}

export const requestEditServices=(temp)=>{
    return (dispatch)=>{
        fetch("https://crm-backend-new.herokuapp.com/editservices",{
            method:"POST",
            body:JSON.stringify(temp),
            headers:{
                "Content-type":"application/json;charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch(editServices(data))
        }).catch(err=>console.log("Couldnt EDIT Services from FE to BE")) 
    }
}

export const requestDeleteServices=(id)=>{
    return (dispatch)=>{
        fetch(`https://crm-backend-new.herokuapp.com/deleteservices/${id}`)
        .then(res=>res.json())
        .then(data=>{
            dispatch(deleteServices(id))
            console.log(data);
        })
        .catch(err=>console.log("Couldnt Delete Service"));
    }
}