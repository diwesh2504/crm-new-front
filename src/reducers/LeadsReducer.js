export const LeadsReducer=(state=[],action)=>{
    switch(action.type){
        case "LOAD_LEADS":
            return [...action.payload];
        case "ADD_LEADS":
            return state.concat(action.payload);
        case "EDIT_LEADS":
            let newstate=[...state].map((item)=>{
                if(item._id==action.payload._id){
                    item.lead_status=action.payload.str
                    return {...item}
                }else{
                    return {...item}
                }

            })
            return [...newstate];
        case "DELETE_LEADS":
            return [...state].filter((item)=>{
                return item._id!=action.payload;
            })
        default:
            return state;
    }
}