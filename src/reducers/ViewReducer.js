export const ViewReducer=(state="none",action)=>{
    switch(action.type){
        case "SET_VIEW":
            return action.payload;
        default:
            return state;
    }
}