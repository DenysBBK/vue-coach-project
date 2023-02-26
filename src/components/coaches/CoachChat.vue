<template>
    <the-chat
    :theError = 'theErrorMessage'
    :fullData = 'getMessages'
    :isCoach = true
    @send-message = 'sendTheMessage'
    ></the-chat>
    
</template>

<script>
export default{
    data(){
        return{
            webSoc: null,
            theError:null,
            theErrorMessage:null
        }
    },
    methods:{
        sendTheMessage(inputValue){
            
            this.$store.dispatch('sendMessageForUser', {
                type:'coach',
                message: inputValue,
                userId: this.$route.params.uid
            })
            
        },
        async loadMessages(){
            try{
                this.$store.dispatch('getAllUsersMessages', {
                id:this.$route.params.uid
            })
            }catch(error){
                this.theErrorMessage = error.message
            }
        },
    },
    computed:{
        getMessages(){
            return this.$store.getters['getAllUsersMessages']
        }
    },
    mounted(){
        this.loadMessages()
         this.webSoc = setInterval(()=>{
            this.loadMessages()
        }, 2000)
    },
    unmounted(){
        clearInterval(this.webSoc);
        
    },
}
    
</script>

<style scoped>
.coach {
    background-color: blue;
    color: white;
    align-self: flex-end;
  }
  .user {
    background-color: green;
    color: white;
    align-self: flex-start;
  }
</style>