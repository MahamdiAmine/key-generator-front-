<template>
  <!--  check login-->
  <div v-if="isLoggedIn">
    <!--    display key infos-->
    <div v-if="k">
      <div class="key">
        <h1>Key #{{ id }}</h1>
        <h3>Status: {{ k.is_expired ? "Expired" : "Valid" }}</h3>
        <h3>Name: {{ k.name }}</h3>
        <h3>Created on: {{ k.creation_date }}</h3>
        <h3>Key: {{ k.key }}</h3>
        <br />
        <button @click="deleteKey" class="delete">Delete Key</button>
      </div>
    </div>
    <div v-else>
      <p>Key Doesn't exist :(</p>
    </div>
  </div>
  <div v-else>
    <!--    if the user is not logged in-->
    <h2>Login is required</h2>
    <router-link to="/dashboard">LogIn</router-link>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'KeyDetail',
  props: ['id'],
  setup (props) {
    const router = useRouter()
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn'))
    const swal = inject('$swal')
    const k = ref(null)

    // get the key
    const getKey = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
        const url = 'https://keygenerator.herokuapp.com/api/key/' + props.id + '/'
        const data = await fetch(url, requestOptions)
        if (data.ok) {
          k.value = await data.json()
        }
      } catch (e) {
        console.log(e)
      }
    }

    // delete the present key
    const deleteKey = async () => {
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
        const url = 'https://keygenerator.herokuapp.com/api/key/' + props.id + '/'
        const data = await fetch(url, requestOptions)
        if (data.ok) {
          await swal.fire('Key Deleted successfully', 'Done!', 'success')
        } else {
          await swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }
        await router.push({ name: 'Dashboard' })
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => getKey())

    return {
      deleteKey,
      isLoggedIn,
      k
    }
  }
}
</script>

<style scoped>
textarea {
  margin-left: 10px;
  margin-top: 15px;
  display: inline-block;
}

.key {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

.delete {
  background: #ff0b44;
  margin-left: 150px;
}
</style>
