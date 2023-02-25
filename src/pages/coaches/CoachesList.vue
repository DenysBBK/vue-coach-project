<template>
    <div>
    <base-dialog :show="!!theError" title="The is some error!" @close="handleTheError">
    <p>{{ theError }}</p>
</base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
        <div class="controls">
            <base-button mode="outline" @click="displayCoaches(true)">Refresh</base-button>
            <base-button link to="/auth?redirectto=register" v-if="!isLoggedIn">Login to register as coach</base-button>
            <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register" >Register as coach</base-button>
        </div>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <ul v-else-if="isAnyCoaches">
            <coach-item v-for="coach in filterAllCoaches" 
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            >{{ coach }}</coach-item>
        </ul>
        <h3 v-else>There is no coaches right now</h3>
    </base-card>
    </section>
</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'
export default{
    data(){
        return{
            isLoading: false,
            theError: null,
            activeFilters:{
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    components:{
        CoachItem,
        CoachFilter
    },
    computed:{
        isLoggedIn(){
            return this.$store.getters.isAuthenticated
        },
        filterAllCoaches(){
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){return true}
                if(this.activeFilters.backend && coach.areas.includes('backend')){return true}
                if(this.activeFilters.career && coach.areas.includes('career')){return true}
                return false
            })
        },
        isAnyCoaches(){
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        },
        isCoach(){
            return this.$store.getters['coaches/isCoach']
        }
        
    
    },
    created(){
        this.displayCoaches()
        console.log(this.$store.getters['coaches/coaches'])
        
    },
    methods:{
        setFilters(updateFilters){
            this.activeFilters = updateFilters
        },
        async displayCoaches(refresh = false){
            this.isLoading = true
           try{
            await this.$store.dispatch('coaches/loadCoaches', {forseRefreshing: refresh });
           } catch(error){
            this.theError = error.message || 'Something went wrong'
           }
            this.isLoading = false
        },
        handleTheError(){
            this.theError = null
        }
    }
}
    
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  
}
.controls a{
    text-align: center;
}
</style>