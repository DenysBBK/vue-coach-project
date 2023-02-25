let timer;

export default{
    async login(context, payload){
       return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload){
       return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })

    },
    async auth(context, payload){
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQ70clykvDg7skQOaOl6xa2rgKDHhk6MY'
        if(mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQ70clykvDg7skQOaOl6xa2rgKDHhk6MY'
            const theId = new Date().getTime()
            const responce = await fetch(`https://course-project-c92a3-default-rtdb.europe-west1.firebasedatabase.app/users/${theId}.json`,{
                method:'PUT',
                body: JSON.stringify({
                    email: payload.email,
                    id:theId
                })
            })
            const theData = await responce.json()
            if(!responce.ok){
                const error = new Error(theData.error.message === "EMAIL_EXISTS" ? 'User is already exsist' : responce.message)
            throw error
            }

        }
        const resp = await fetch(url, {
            method:"POST",
            body:JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const data = await resp.json()
        if(!resp.ok){    
            const error = new Error(data.error.message === "EMAIL_EXISTS" ? 'User is already exsist' : resp.message)
            throw error
        }
        const expiresIn = +data.expiresIn * 1000
        
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('theUserEmail', payload.email)

        timer = setTimeout(function(){
            context.dispatch('autoLogout')
        },expiresIn)

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
        })
    },
    loginFromStorage(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();
//если токен заэкспрайренный, то я не логиню юзера
        if(expiresIn < 0){
            return
        }
        timer = setTimeout(function(){
            context.dispatch('autoLogout')
        },expiresIn)


        if(token && userId){
            context.commit('setUser', {
                token: token,
                userId: userId,
            })

        }
    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('theUserEmail')

        clearTimeout(timer);
        context.commit('setUser', {
            token: null,
            userId:null,
        });
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('didLogout')
    }
}