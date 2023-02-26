import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory  } from "vue-router";
// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceive from './pages/requests/RequestReceive.vue';
import NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'
import UserChat from './components/UserChat.vue'
import CoachChat from './components/coaches/CoachChat.vue'

const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'));
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const RequestReceive = defineAsyncComponent(() => import('./pages/requests/RequestReceive.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));
// const UserChat = defineAsyncComponent(() => import('./components/UserChat.vue'))

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', redirect:'/coaches'},
        {path:'/coaches', component:CoachesList},
        {path:'/coaches/:id', component:CoachDetail,
        props:true,
        children:[
            {path:'contact', component:ContactCoach}
        ]},
        {path:'/register', component:CoachRegistration, meta:{requiresAuth: true}},
        {path:'/requests', component:RequestReceive, meta:{requiresAuth: true}},
        {path:'/auth', component: UserAuth, meta:{requiresUnauth: true}},
        {path:'/coach-chat/:uid', component: CoachChat, props:true},
        {path: '/user-chat', component: UserChat},
        {path:'/:notFound(.*)', component: NotFound}

    ]
});

router.beforeEach(function(to, _, next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth')
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches')
    }else(
        next()
    )
    
})
export default router