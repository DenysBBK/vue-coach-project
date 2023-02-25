export default{
    theUsers(state, payload){
        state.users = payload
    },
    addToUsersMessages(state, payload){
        state.messagesForUser = payload
    }
}