<template>
  <!--  key list-->
  <h1>Keys:</h1>
  <div v-for="key in keys" :key="key.id">
    <router-link :to="{ name: 'KeyDetail', params: { id: key.id } }">
      <h2>{{ key.name }}</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'KeyList',
  props: ['keys']
}
</script>

<style></style>
