export default{
    addRequest(state, payload){
        state.requests.push(payload);
    },
    putRequest(state, payload){
       state.requests = payload 
    }
}