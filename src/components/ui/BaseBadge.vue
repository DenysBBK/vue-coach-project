<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default{
    props:['type', 'title'],
    computed:{
        text(){
            return this.title.toUpperCase()
        }
    }
}


</script>




<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  
}

.frontend {
  background-color: #de1212;
  color: white;
}

.backend {
  background-color: #3500f6;
  color: white;
}

.career {
  background-color: #03f758;
  color: white;
}

</style>