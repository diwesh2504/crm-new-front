export const ContactsReducer=(state=[],action)=>{
    switch(action.type){
        case "LOAD_CONTACTS":
            return action.payload;
        case "ADD_CONTACTS":
            return state.concat(action.payload);
        case "DELETE_CONTACTS":
            return state.filter((item)=>{
                return item._id!=action.id
            })
        default:
            return state;
    }
}