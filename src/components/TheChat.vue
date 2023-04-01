<template>
  <div>
    <base-dialog :show="!!chatError" title="There is some error" @close="handleError">
        <p>{{ chatError }}</p>
</base-dialog>    
    <base-dialog :show="isLoading" fixed title="Chat connection">
        <base-spinner></base-spinner>
</base-dialog>
    <base-card>
    <div class="chat-body" v-if="receivedMessages.length >=1 || isCoach">
      <div class="the-chat">
        <ul id="chat-window" >
          <li v-for="message in receivedMessages"
          :key="message"
          :type="message.type"
          :message="message.message"
          class="message"
          :class="isCoachMeeesage(message)"
          >{{ message.message }}</li>
        </ul>
      </div>
        <div class="input-chat" >
          <input type="text" placeholder="Enter you message..." v-model="inputValue" @keydown.enter="sendMessage">
          <button @click="sendMessage" >Send</button>
        </div>
      </div>
      <p v-if="receivedMessages.length <= 0">You have no messages right now </p>
    
    </base-card>
  </div>
</template>
<script>
export default{
  props:['fullData', 'isCoach', 'theError'],
  emits:['send-message'],
  data(){
    return{
      inputValue:'',
      massageColour:null,
      chatError: this.theError,
      isLoading: false,
    }
  },
  computed:{
    receivedMessages(){
      return this.fullData
    },
  },
  methods:{
    sendMessage(){
      this.$emit('send-message', this.inputValue)
      this.inputValue = ''
    },
    isCoachMeeesage(one){
      if(this.isCoach){
        return {'coach':one.type === 'user', 'user':one.type === 'coach'}
      } else {
        return {'user':one.type === 'user', 'coach':one.type === 'coach'}
      }
    },
    handleError(){
                this.chatError = null
            }
  },
  mounted(){
            document.title = 'Chat'
        }
  
}
</script>

<style scoped>
 a{
    border-radius: 30px;
    
  }
  
.chat-body {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    
    margin: 0 auto;
    flex-direction: column;
    max-width: 100%;
    padding: 10px;
  }
  .the-chat{
    height: 400px;
    overflow-y: auto;
    padding: 0 10px;
    margin: 0 auto;
    width: 100%;
  }
  .the-chat::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.the-chat::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
}
.the-chat::-webkit-scrollbar-track {
  background-color: #f2f2f2;
  border-radius: 4px;
}
  #chat-window {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .message {
    padding: 5px;
    margin-bottom: 10px;
    max-width: 80%;
    word-wrap: break-word;
    border-radius: 10px;
  }
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
  .input-chat{
    display: flex;
    align-items: center;
    column-gap: 20px;
    padding-top: 20px;
    justify-content: center;
  }
  input[type="text"] {
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    
    vertical-align: top;
    
   
  }
  button {
    text-decoration: none;
  padding: 0.50rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  vertical-align: middle;
  }
  input[type="text"] {
    max-width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  p{
    display: flex;
    align-self: center;
    justify-content: center;
  }
  
 
</style>