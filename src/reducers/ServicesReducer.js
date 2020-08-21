export const ServicesReducer=(state=[],action)=>{
    switch(action.type){
        case "LOAD_SERVICES":
            return action.payload;
        case "ADD_SERVICES":
            return state.concat(action.payload);
        case "EDIT_SERVICES":
            let newstate=[...state].map((item)=>{
                if(item._id==action.payload._id){
                    item.name=action.payload.name;
                    item.status=action.payload.status;
                    item.contact_detail=action.payload.contact_detail;
                    item.service=action.payload.service;
                    return {...item}
                }else{
                    return {...item}
                }

            })
            return [...newstate];
        case "DELETE_SERVICES":
            return [...state].filter((item)=>{
                return item._id!=action.payload;
            })
        default:
            return state;
    }
}