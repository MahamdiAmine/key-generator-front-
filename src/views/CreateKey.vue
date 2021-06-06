<template>
  <!-- check login first-->
  <div v-if="isLoggedIn">
    <form @submit.prevent="addKey" class="root">
      <h2>Create Key</h2>
      <p>
        <input type="text" v-model="name" placeholder="Name ex :My Key" />
      </p>
      <p>
        <input type="text" v-model="key" placeholder="Insert your key here" />
      </p>
      <p>
        <textarea type="text" v-model="remarks" placeholder="Remarks" />
      </p>
      <p>
        <input
          type="number"
          v-model="lifeDuration"
          placeholder="life duration"
        />
      </p>
      <button type="submit">Create</button>
    </form>
  </div>
  <div v-else>
    <!-- redirect to the login-->
    <h2 class="required-login">Login is required</h2>
    <router-link to="/dashboard" class="redirect-login">LogIn</router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CreateKey',

  setup () {
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn'))
    const router = useRouter()
    const key = ref(null)
    const name = ref(null)
    const lifeDuration = ref(365)
    const remarks = ref(null)
    const addKey = async () => {
      try {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('key', key.value)
        formData.append('remark', remarks.value)
        const requestOptions = {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
        const url = 'https://keygenerator.herokuapp.com/api/key/'
        const data = await fetch(url, requestOptions)
        if (data.ok) {
          console.log('ok')
        } else {
          console.log('not ok')
        }
        await router.push({ name: 'Dashboard' })
      } catch (e) {
        console.log(e)
      }
    }
    return {
      addKey,
      isLoggedIn,
      key,
      name,
      lifeDuration,
      remarks
    }
  }
}
</script>

<style scoped>
.root {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  margin: 100px auto 0;
  border-radius: 20px;
}

input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  padding: 5px 0;
  margin: 10px 0 5px 0;
  width: 100%;
}

button {
  background-color: #3498db;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  color: white;
}
.required-login {
  font-size: 55px;
}
.redirect-login {
  font-size: 40px;
}
</style>
