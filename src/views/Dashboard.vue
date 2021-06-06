<template>
  <!--  handle login-->
  <div v-if="loggedIn == null">
    <h1>The login is required</h1>
    <form @submit.prevent="login">
      <label>Username</label>
      <input type="text" required v-model="username" />
      <label>Password</label>
      <input type="password" required v-model="password" />
      <div class="submit">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
  <!--  show keys-->
  <div v-else>
    <div v-if="err">{{ err }}</div>
    <div v-else>
      <div v-if="keys">
        <button class="logout" @click="logout">Logout</button>
        <div class="dashboard">
          <KeyList :keys="keys" />
        </div>
      </div>
      <div v-else>
        <h1>Couldn't load Data :(</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import getKeys from '../composables/getKeys'
import KeyList from '../views/KeyList'

export default {
  name: 'Dashboard',
  components: { KeyList },
  setup () {
    const loggedIn = ref(localStorage.getItem('isLoggedIn'))
    const token = ref(null)
    const username = ref(null)
    const password = ref(null)

    // logout
    const logout = () => {
      // remove the credentials and connexion infos
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('token')
      location.reload()
    }

    // login
    const login = async () => {
      try {
        // build the request body
        const formData = new FormData()
        formData.append('username', username.value)
        formData.append('password', password.value)
        // request options
        const requestOptions = {
          method: 'POST',
          body: formData
        }
        const url = 'https://keygenerator.herokuapp.com/api/get-token/'
        const data = await fetch(url, requestOptions)
        if (data.ok) {
          console.log('ok')
          const response = await data.json()

          // set the cnx infos
          localStorage.setItem('token', response.token)
          localStorage.setItem('isLoggedIn', '1')

          // load the data
          await loadData()

          // set the loggedIn value to 1 because  Local storage just isn't
          // reactive :(
          loggedIn.value = '1'
        } else {
          // authentication failed
          console.log('not ok')
        }
      } catch (e) {
        console.log(e)
      }
    }
    const { keys, err, loadData } = getKeys()

    // load the data
    loadData()

    return { login, logout, loggedIn, username, password, keys, err, token }
  }
}
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

button {
  border-radius: 20px;
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

.submit {
  text-align: center;
}

.logout {
  background: #2c3e50;
}
</style>
