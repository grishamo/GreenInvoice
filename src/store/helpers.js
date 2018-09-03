import {mapState, mapActions} from 'vuex'

export const loginGetters = {
  ...mapState({
    apiKey: state => state.GreenStore.apiKey,
    apiSecret: state => state.GreenStore.apiSecret
  })
}

export const welcomeGetters = {
  ...mapState({
    user: state => state.GreenStore.user
  })
}

export const loginActions = mapActions([
  'updateApiKey',
  'updateSecretiKey',
  'updateToken',
  'updateUser',
  'getUserInfo',
  'getToken'
])

export const welcomeActions = mapActions([
  'getUserInfo',
  'logOut'
])
