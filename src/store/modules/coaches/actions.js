export default {
    async registerCoachh(context, data){
        const userId = context.rootGetters.userId;
        const coach = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };
        const token = context.rootGetters.token

       const responce = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
            //метод ПУТ позволяет создать, если нет данных или получить если есть, а ПОСТ будет все равно записывать туда
            method: 'PUT',
            body:JSON.stringify(coach)
        });

       // const responceData = await responce.json();

        if(!responce.ok){
            //error...
        }

        context.commit('registerTheCoach', {
            ...coach,
            id: userId
        })
    },
    async loadCoaches(context, payload){
        if(!payload.forseRefreshing && !context.getters.shouldUpdate){
            return
        }


        const responce = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
        const responceData = await responce.json(); 
        if(!responce.ok){
            const error = new Error(responceData.message || 'Failed to fetch');
            throw error
        }
        const coaches = [];
//responceData[key] - такой синтаксис чтобы получить данные именно от этого айди. Ну и так в переборе для каждого айди
        for(const key in responceData){
            const newCoach = {
            id: key,
            firstName: responceData[key].firstName,
            lastName: responceData[key].lastName,
            description: responceData[key].description,
            hourlyRate: responceData[key].hourlyRate,
            areas: responceData[key].areas
            }
        coaches.push(newCoach);
        }

        context.commit('viewAllCoaches', coaches);
        context.commit('setFetchTimestamp')

    }
}