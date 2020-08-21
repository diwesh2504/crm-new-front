 const loadLeads=(data)=>{
    return {type:"LOAD_LEADS", payload:data};
}

const addLeads=(data)=>{
    return {type:"ADD_LEADS",payload:data};
}

const editLeads=(id,str)=>{
    const json={_id:id,str}
    return {type:"EDIT_LEADS",payload:json}
}

export const deleteLeads=(id)=>{
    return {type:"DELETE_LEADS",payload:id}
}

export const requestLoadLeads=()=>{
    return (dispatch)=>{
    fetch('https://crm-backend-new.herokuapp.com/getleads')
            .then(res=>res.json())
            .then(data=>{
                dispatch(loadLeads(data))
            })
            .catch(err=>console.log("Couldnt Get Leads To Frontend"))
            }
        }
export const requestAddLeads=(item)=>{
    return (dispatch)=>{
    fetch('https://crm-backend-new.herokuapp.com/addleads',{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>dispatch(addLeads(data)))
        .catch(err=>console.log("couldnt Add Leads"))
    }
}

export const requestEditLeads=(id,status)=>{
    return (dispatch)=>{
        fetch('https://crm-backend-new.herokuapp.com/editleads',{
            method:"POST",
            body:JSON.stringify({
                id,
                value:status
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=> dispatch(editLeads(data._id,data.lead_status)))
        .catch(err=>console.log("Couldnt Edit"))
    }

}

export const requestDeleteLeads=(id)=>{
    return (dispatch)=>{
        fetch(`https://crm-backend-new.herokuapp.com/deleteleads/${id}`)
        .then(res=>res.json())
        .then(data=>{
            dispatch(deleteLeads(id))
            console.log(data);
        })
        .catch(err=>console.log("Couldnt Delete Lead"));
    }
}