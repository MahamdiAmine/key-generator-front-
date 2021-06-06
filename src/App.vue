<template>
  <!--  app's main nav-->
  <div id="nav">
    <router-link to="/home">Home</router-link>
    |
    <router-link to="/dashboard">Dashboard</router-link>
    |
    <router-link to="/create-key">Create New Key</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const loggedIn = ref(localStorage.getItem('isLoggedIn'))
    return {
      loggedIn
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
  background: #eee;
}
</style>
