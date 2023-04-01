<template>
    <div>
    <base-dialog :show="!!theError" title="There is some error" @close="handleError">
        <p>{{ theError }}</p>
</base-dialog>    
    <base-dialog :show="isLoading" fixed title="Authenticating">
        <base-spinner></base-spinner>
</base-dialog>
    <base-card>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model.trim="email"/>
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password"/>
        </div>
        <p class="error" v-if="!formIsValid">The password or email is invalid</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchBetweenForm">{{ switchModeButtonCaption }}</base-button>
    </form>
    </base-card>
</div>
</template>

<script>
    export default {
        data(){
            return{
                email:'',
                password:'',
                formIsValid: true,
                mode:'login',
                isLoading: false,
                theError: null,
                pageTitle:'Login'
                
            }
        },
        methods:{
            async submitForm(){
                this.formIsValid = true;
                if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                    this.formIsValid = false;
                    return
                }
                this.isLoading = true;
                const actionPayload = {
                        email: this.email,
                        password: this.password
                    }

                try{
                    if(this.mode === 'login'){
                    await this.$store.dispatch('login', actionPayload)
                } else{
                   await this.$store.dispatch('signup', actionPayload)
                }
                const redirectUrl = `/${(this.$route.query.redirectto || 'coaches')}`
                this.$router.replace(redirectUrl)
                }catch(err){
                    
                    this.theError = err.message || 'Failed to auth. Try again later'
                }
                
                this.isLoading = false 
            },
            switchBetweenForm(){
                if(this.mode === 'login'){
                    this.mode ='signup';
                    document.title = 'Sign Up'
                } else{
                    this.mode ='login';
                    document.title = 'Login'
                }
                // this.mode === 'login' ? this.mode = 'signup': this.mode = 'login'
            },
            handleError(){
                this.theError = null
            }
        },
        computed:{
            submitButtonCaption(){
                if(this.mode === 'login'){
                    return 'Login'
                } else{
                    return 'Sign Up'
                }
                
            },
            switchModeButtonCaption(){
                if(this.mode === 'login'){
                    return 'Go to Sign Up'
                } else{
                    return 'Go to Login'
                } 
            }
        },
        mounted(){
            document.title = this.pageTitle
        }
       
        
    }
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
.error{
    color: red;
}



</style>