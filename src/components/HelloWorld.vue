<template>
 <div class="hello">
   <h1> Vue-Router-Auth </h1>
   <h2>{{ msg }}</h2>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Vue Authentication and Route handling User Vue-router'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
