export default{
    async contactCoach(context, payload){
        const newRequest = {
            //Каждый запрос так же должен содержать айди! (пайди юзера будет следующим)
            userEmail: payload.email,
            message: payload.message
        };
       const response = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responceData = await response.json();
        if(!response.ok){
            const error = new Error(responceData.message || 'Failed to put request for coach');
            throw error
        }

        newRequest.id = responceData.name
        newRequest.coachId = payload.coachId
        context.commit('addRequest', newRequest)
    },
    async fetchRequest(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token
        const resp = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`);
        const data = await resp.json();

        if(!resp.ok){
            const error = new Error(data.message || 'Failed to get request for coach');
            throw error
        }
        

        const requests = [];

        for(const key in data){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: data[key].userEmail,
                message: data[key].message
            };
        requests.push(request);   
        }
        context.commit('putRequest', requests)
    }
}