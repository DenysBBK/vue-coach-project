import { createStore } from "vuex";
import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'
import authModule from './modules/auth/index.js'
import chatModule from "./modules/chat/index.js";

const store = createStore({
    modules:{
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule,
        chat: chatModule
    },
})


export default store