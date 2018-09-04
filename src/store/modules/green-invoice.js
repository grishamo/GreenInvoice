import axios from 'axios'
import { Cookies } from 'quasar'

const TOKEN_API = 'https://private-anon-95339804f0-greeninvoice.apiary-mock.com/api/v1/account/token'
const USER_API = 'https://private-anon-95339804f0-greeninvoice.apiary-mock.com/api/v1/users/me'
const COOKIE_NAME = 'green-user'

/**
 * Save token to local storage - currently only Cookies available
 */
export const LocalData = {
  get () {
    return Cookies.get(COOKIE_NAME)
  },
  remove () {
    Cookies.remove(COOKIE_NAME)
  },
  set (data) {
    let today = new Date()
    let expDate

    if (data && data.expires) {
      expDate = new Date(today.getTime() + data.expires)
    } else {
      expDate = today
    }

    let options = {
      expires: expDate
    }

    Cookies.set(COOKIE_NAME, JSON.stringify(data), options)
  }
}

export default {
  state: {
    apiKey: '',
    apiSecret: '',
    logedIn: false,
    user: null,
    token: null
  },
  mutations: {
    UPDATE_API_KEY (state, newValue) {
      state.apiKey = newValue
    },
    UPDATE_SECRET_KEY (state, newValue) {
      state.apiSecret = newValue
    },
    UPDATE_TOKEN (state, newValue) {
      state.token = newValue
    },
    UPDATE_USER (state, newValue) {
      state.user = newValue
    },
    UPDATE_LOGIN_STATUS (state, newValue) {
      state.logedIn = newValue
    }
  },
  actions: {
    updateApiKey ({commit}, newApiKey) {
      commit('UPDATE_API_KEY', newApiKey)
    },
    updateSecretiKey ({commit}, newSecretKey) {
      commit('UPDATE_SECRET_KEY', newSecretKey)
    },
    updateUser ({commit}, newUser) {
      commit('UPDATE_USER', newUser)
      commit('UPDATE_LOGIN_STATUS', true)
    },
    updateToken ({commit}, newToken) {
      commit('UPDATE_TOKEN', newToken)
      LocalData.set(newToken)
    },
    logOut ({commit}) {
      // Consider to return a Promise if in the future logout will be an async
      LocalData.remove()
      commit('UPDATE_LOGIN_STATUS', false)
    },
    getToken () {
      console.log('updateToken')

      return axios({
        method: 'POST',
        url: TOKEN_API,
        headers: {
          ContentType: 'application/json'
        },
        data: {
          id: this.state.GreenStore.apiKey,
          secret: this.state.GreenStore.apiSecret
        }
      })
    },
    getUserInfo () {
      console.dir('getUser', this.state.GreenStore)

      return axios({
        method: 'GET',
        url: USER_API,
        headers: {
          ContentType: 'application/json',
          Authorization: 'Basic ' + this.state.GreenStore.token.token
        }
      })
    }
  }
}
