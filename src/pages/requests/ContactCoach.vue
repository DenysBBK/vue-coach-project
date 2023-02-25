<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !isSameEmail || !formIsValid}">
            <label for="email">You e-mail</label>
            <input type="email" id="email" v-model.trim="email" />
        </div>
        <p class="errors" v-if="!isSameEmail">Email is different from the one you registered with</p>
        <div class="form-control" :class="{invalid: !formIsValid}">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model.trim="message"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please, enter valid email and message</p>
        <div class="actions">
            <base-button>Send message</base-button>
        </div>
    </form>
</template>

<script>
    export default{
        data(){
            return{
                email:'',
                message:'',
                formIsValid: true,
                isSameEmail: true
            }
        },
        methods:{
            submitForm(){
                this.formIsValid = true
                if(this.email === '' || !this.email.includes('@') || this.message === ''){
                    this.formIsValid = false;
                    return;
                }
                if(this.email !== localStorage.getItem('email')){
                  this.isSameEmail = false;
                  return
                }
                this.$store.dispatch('requests/contactCoach', {
                    email: this.email,
                    message: this.message,
                    //из роута я беру айдишку коуча, которому отправляю свой запрос
                    coachId: this.$route.params.id
                });
                this.$router.replace('/coaches');

            }
        },
        watch:{
          email(newValue, oldValue){
            if(newValue !== oldValue){
              this.isSameEmail = true
            }
          },
          message(newValue, oldValue){
            if(newValue !== oldValue){
              this.formIsValid = true
            }
          }
        }
    }
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
  border-color: red;
  font-size: 10px;
  margin-top: -5px;
}

.actions {
  text-align: center;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}

</style>