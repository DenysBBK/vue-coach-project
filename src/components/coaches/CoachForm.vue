<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model.trim="firstName.value" @blur="clearValidation('firstName')"/>
            <p v-if="!firstName.isValid">The First Name must be not empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model.trim="lastName.value" @blur="clearValidation('lastName')"/>
            <p v-if="!lastName.isValid">The Last Name must be not empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}" >
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.value" @blur="clearValidation('description')"></textarea>
            <p v-if="!description.isValid">The description must be not empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !rate.isValid}">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" v-model.number="rate.value" @blur="clearValidation('rate')"/>
            <p v-if="!rate.isValid">The rate must be not empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.value" @blur="clearValidation('areas')"/>
                <label for="frontend">Frontend</label>          
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.value" @blur="clearValidation('areas')"/>
                <label for="backend">Backend</label> 
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.value" @blur="clearValidation('areas')"/>
                <label for="career">Career</label> 
            </div>
            <p v-if="!areas.isValid">Choose at least one parametr</p>
        </div>
        <p class="all-data" v-if="!formIsValid">Data is invalid. Please turn the right value.</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default{
    emits:['save-data'],
    data(){
        return{
            firstName:{
              value:'',
              isValid: true
            },
            lastName:{
              value:'',
              isValid: true
            },
            description:{
              value:'',
              isValid: true
            },
            rate:{
              value:null,
              isValid: true
            },
            areas:{
              value:[],
              isValid: true
            },
            formIsValid: true,
        }
    },
    methods:{
      clearValidation(input){
        this[input].isValid = true
      },
      validateForm(){
        this.formIsValid = true;
        if(this.firstName.value === ''){
          this.firstName.isValid = false;
          this.formIsValid = false;
        }
        if(this.lastName.value === ''){
          this.lastName.isValid = false;
          this.formIsValid = false;
        }
        if(this.description.value === ''){
          this.description.isValid = false;
          this.formIsValid = false;
        }
        if(this.areas.value.length === 0){
          this.areas.isValid = false;
          this.formIsValid = false;
        }
        if(!this.rate.value || this.rate.value < 0){
          this.rate.isValid = false;
          this.formIsValid = false;
        }
       
        
        
          
        },
        submitForm(){
          this.validateForm()
          if(!this.formIsValid){
            return
          }
            const formData = {
                first: this.firstName.value,
                last: this.lastName.value,
                desc: this.description.value,
                rate: this.rate.value,
                areas: this.areas.value
            };
            this.$emit('save-data', formData);
            
        },
        
    }
}
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

/* .invalid label {
  color: red;
} */

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
p{
  color: red;
  font-size: 10px;
  margin: 0 auto;
}
.all-data {
  font-size: 17px;
  padding-bottom: 10px;
}

</style>