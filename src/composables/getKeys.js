import { ref } from 'vue'

const getKeys = () => {
  // constants
  const keys = ref([])
  const err = ref(null)

  // load the data from the API
  const loadData = async () => {
    // the login is required
    if (localStorage.getItem('isLoggedIn')) {
      // get the token
      const token = localStorage.getItem('token')
      try {
        // request options
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token
          }
        }
        const url = 'https://keygenerator.herokuapp.com/api/key/'
        const data = await fetch(url, requestOptions)
        if (data.ok) {
          keys.value = await data.json()
        } else {
          throw Error('COULD NOT FETCH DATA')
        }
      } catch (e) {
        err.value = e.message
      }
    }
  }
  return {
    keys,
    err,
    loadData
  }
}

export default getKeys
