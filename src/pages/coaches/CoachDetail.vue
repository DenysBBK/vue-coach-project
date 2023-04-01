<template>
   <div>
   <section>
      <base-card>
   <h2>{{ fullName }}</h2>
   <h3>${{ rate }}/hour</h3>
</base-card>
   </section>
   <section>
      <base-card>
      <div>
      <div class="theinfo">
      <h2>Interested? Take the contact now!</h2>
      <base-button link :to="contactLink">Contact</base-button>
   </div>
</div>
   <router-view></router-view>
   </base-card>
   </section>
   <section>
      <base-card>
   <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
   <p>{{ description }}</p>   
   
   </base-card>
   </section>
</div>
</template>

<script>
export default{
   props:['id'],
   data(){
      return{
         selectedCoach: null,
         
      }
   },
   computed:{
      fullName(){
         return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
      },
      contactLink(){
         return `/coaches/${this.selectedCoach.id}/contact`
      },
      areas(){
         return this.selectedCoach.areas
      },
      description(){
         return this.selectedCoach.description
      },
      rate(){
         return this.selectedCoach.hourlyRate
      },
   },
   created(){
      this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id)
   },
   mounted(){
            document.title = 'Coach details'
        }

}
    
</script>

<style scoped>
h2, h3{
   text-align: center;
}
.theinfo{
   display: flex;
   flex-direction: column;
   align-items: center;

}

</style>