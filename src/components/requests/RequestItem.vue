<template>
    <li>
      <div class="info">
        <div>
            <a :href="emailLink">{{ email }}</a>
        </div>
        <p>{{ message }}</p>
      </div>
      <div class="the-button">
        <base-button link :to=chatWithUser>Go to chat</base-button>
      </div>
    </li>
</template>

<script>

    export default {
    props: ["email", "message", "uid"],
   
    data(){
      return{
        
      }
    },
    computed: {
        emailLink() {
            return "mailto:" + this.email;
        },
        chatWithUser(){
          return `/coach-chat/${this.uid}`
        },
      
    },
    
    
    
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 20px;
}
.the-button a{
  color: white;
}
.the-button a:hover{
  color: greenyellow
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
@media (max-width: 450px){
  li{
    flex-direction: column;
    align-items: center;
  }
  .info{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}


</style>