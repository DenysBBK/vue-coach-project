export default {
    registerTheCoach(state, payload){
        state.coaches.push(payload)
    },
    viewAllCoaches(state, payload){
        state.coaches = payload
    },
    setFetchTimestamp(state){
        state.lastFetch = new Date().getTime();
        
    }
}