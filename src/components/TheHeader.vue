<template>
    <header>
        <nav>
            <h1><router-link to="/">Find a Mentor</router-link></h1>
            <ul>
              <li v-if="isLoggedIn && !isUserCoach"><router-link to="/user-chat">To chat</router-link></li>
                <li><router-link to="/coaches">To all Mentors</router-link></li>
                <li v-if="isLoggedIn && isUserCoach"><router-link to="/requests">To your Requests</router-link></li>
                <li v-if="!isLoggedIn"><router-link to="/auth">Login</router-link></li>
                <li v-if="isLoggedIn">
                  <base-button @click="logOut">Logout</base-button>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
export default{
  computed:{
    isLoggedIn(){
      return this.$store.getters.isAuthenticated
    },
    isUserCoach(){
      return this.$store.getters['coaches/isCoach']
    },
  },
  methods:{
    logOut(){
      this.$store.dispatch('logout')
      this.$router.replace('/coaches')
    }
  },
  created(){
    console.log(this.isUserCoach)
    
  }
}


</script>
<style scoped>
header {
  width: 100%;
 
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  row-gap: 20px;
}

header a {
    text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  line-height: 120%;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  row-gap: 20px;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
}

li {
  margin: 0 0.5rem;
  text-align: center;
  
}
@media (max-width: 620px){
  header nav {
    
    flex-direction: column;
  }
  header ul {
   
    flex-direction: column;
  }
}
</style>