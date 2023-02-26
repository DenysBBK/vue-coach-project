export default{
    async getAllUsers(context){
        // const token = context.rootGetters.token
        const responce = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
        const data = await responce.json();
        if(!responce.ok){
            const error = new Error('No bro!');
            throw error
        }

        const myUsers = []
        
        for(const key in data){
            const newUser = {
                id:data[key].id,
                email:data[key].email,
                
            }
            myUsers.push(newUser)
        }
     
        
        context.commit('theUsers', myUsers)
    },
    async sendMessageForUser(_, payload){
        const newMessage = {
            type:payload.type,
            message: payload.message
        }
        const responce = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/users/${payload.userId}/messages.json`, {
            method: 'POST',
            body: JSON.stringify(newMessage)
        })
        const data = await responce.json()
        if(!responce.ok){
            const error = new Error(data.message)
            throw error
        }
        
        
    },
    async getAllUsersMessages(context, payload){
        const responce = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/users/${payload.id}/messages.json`)
        const data = await responce.json()

        if(!responce.ok){
            const error = new Error(data.message)
            throw error
        }
        const allMessages = []
        for(let one in data){
            const oneMessage = {
                type:data[one].type,
                message:data[one].message
            }
            allMessages.push(oneMessage)
        }
        context.commit('addToUsersMessages', allMessages)
    }
    
}