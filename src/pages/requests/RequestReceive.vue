<template>
    <div>
    <base-dialog :show="!!theError" title="The is some error!" @close="handleTheError">
    <p>{{ theError }}</p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>All requests</h2>
            </header>
            <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasRequests && !isLoading">
                    <request-item v-for="req in receiveRequests" 
                    :key="req.id"
                    :email="req.userEmail"
                    :message="req.message"
                    :uid="findNecessary(req)"
                    ></request-item>
                </ul>
                <h3 v-else>You have not any requests now</h3>
        </base-card>
    </section>
</div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue';
export default{
    data(){
        return{
            isLoading: false,
            theError: null,
            theUser: null
            
        }
    },
    components:{
        RequestItem
    },
    computed:{
        receiveRequests(){
            return this.$store.getters['requests/requests']
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests']
        },
        hasUsersChat(){
            return this.$store.getters['theAllUsers']
        },

    },
    
    created(){
        this.loadAllRequests()
        this.loadAllUserRequests();
        
    },
    methods:{
       async loadAllRequests(){
            this.isLoading = true;
           try{
            await this.$store.dispatch('requests/fetchRequest')
           }catch(error){
            this.theError = error.message || 'Something went wrong'
           }
           this.isLoading = false
            
        },
        async loadAllUserRequests(){
            try{
                await this.$store.dispatch('getAllUsers')
            }catch(error){
                this.theError = error.message || 'Something went wrong'
            }
        },
        
        handleTheError(){
            this.theError = null;
        },
        findNecessary(theUser){
            const my = this.hasUsersChat.find(user => user.email === theUser.userEmail)
            return my.id
        }  
    },   
    mounted(){
            document.title = 'Requests'
        }
} 
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}

</style>