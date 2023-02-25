<template>
    <section>
        <base-card>
        <h1>404</h1>
        <h3>Page not found</h3>
        <ul>
            <li><p>To the main </p></li>
            <li><router-link to="/coaches">menu</router-link></li>
        </ul>
        </base-card>
    </section>
</template>

<script>
    
</script>

<style scoped>
h1, h3{
    display: flex;
    justify-content: center;
}
ul{
    list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
   
}
li{
    margin: 0 0.2rem;
}

</style>