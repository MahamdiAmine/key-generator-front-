<template>
  <!--  key list-->
  <button class="sort" @click="sortKeys">Sort Keys By the creation date</button>
  <h1>Keys:</h1>
  <div v-for="key in Keys" :key="key.id">
    <router-link :to="{ name: 'KeyDetail', params: { id: key.id } }">
      <h2>{{ key.name }}</h2>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'KeyList',
  props: ['keys'],
  setup (props) {
    const Keys = ref(props.keys)
    const sortKeys = () => {
      console.log(Keys.value)
      const comp = (a, b) => {
        return new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime()
      }

      Keys.value = Keys.value.sort(comp)
      console.log(Keys.value)
    }
    return {
      sortKeys,
      Keys
    }
  }
}
</script>

<style scoped>
.sort{
  background: #42b983;
  font-size: 18px;
}
</style>
