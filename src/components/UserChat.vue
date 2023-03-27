<template>
    <the-chat 
    :theError = 'theErrorMessage'
   :fullData = 'getMessages'
   :isCoach = false
   @send-message="addToAllMessages"
    ></the-chat>
</template>

<script>
export default {
    data(){
        return{
            theMessages:[],
            webSoc:null,
            theUserId:'',
            theErrorMessage:null
        }
    },
    methods:{
        addToAllMessages(inputValue){
            let newMessage = {
                type: 'user',
                message: inputValue
            }
            this.$store.dispatch('sendMessageForUser', {
                type:'user',
                message: inputValue,
                userId: this.theUserId
            })
            this.theMessages.push(newMessage)
        },
        async loadMessages(){
            try{
                this.findNecessaryUser()
                await this.$store.dispatch('getAllUsersMessages', {
                id:this.theUserId
            })
            }catch(error){
                this.theErrorMessage = error.message
            }
        },
        async loadUsers(){
            try{
                await this.$store.dispatch('getAllUsers')
            }catch(error){
                this.theErrorMessage = error.message
            }
        },
        findNecessaryUser(){
            let fromLocalStorage = localStorage.getItem('theUserEmail')
            let choosen = this.getUsers.find(one => one.email === fromLocalStorage)
            this.theUserId = choosen.id
        },        
    },
    computed:{
        getMessages(){
            return this.$store.getters['getAllUsersMessages']
        },
        getUsers(){
            return this.$store.getters['theAllUsers']
        },
        
    },
    mounted(){
        this.loadUsers()
         this.webSoc = setInterval(()=>{
            this.loadMessages()
        }, 2000)
    },
    unmounted(){
        clearInterval(this.webSoc);
        
    }    
}
</script>

<style  scoped>
.coach {
    background-color: green;
    color: white;
    align-self: flex-start;
  }
  .user {
    background-color: blue;
    color: white;
    align-self: flex-end;
  }
</style>