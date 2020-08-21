export const UserReducer=(state=[],action)=>{
    switch(action.type){
        case "LOAD_USERS":
            return [...action.payload]
        case "ADD_USERS":
            return state.concat(action.payload);
        case "EDIT_USERS":
            return state.map((item)=>{
                if(item._id==action.payload.id){
                    item.lead_status=action.payload.str
                    return {...item}
                }else{
                    return {...item}
                }

            })
            
        default:
            return state;
    }
}