<template>
  <!--  home page-->
  <div class="home">
    <p>
      Welcome to the Key Generator app, switch to the dashboard tab to perform
      the following operations:
    </p>
    <ul>
      <li>Show keys</li>
      <li>Create a Key</li>
      <li>Delete a Key</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
p {
  padding: 10px;
  margin-left: 40px;
  text-align: left;
}

li,
ul {
  text-align: left;
  margin-left: 40px;
}
</style>
