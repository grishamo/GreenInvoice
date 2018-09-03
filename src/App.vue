<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { Loading } from 'quasar'
import { LocalData } from './store/modules/green-invoice'

export default {
  name: 'App',
  preFetch ({store, currentRoute, previousRoute, redirect, ssrContext}) {
    Loading.show()

    let data = LocalData.get()

    if (data && data.token) {
      store.dispatch('updateToken', data)

      return store.dispatch('getUserInfo')
        .then((user) => {
          store.dispatch('updateUser', user.data)
          Loading.hide()
          redirect('/welcome')
        })
        .catch((err) => {
          Loading.hide()
          console.dir(err)
        })
    } else {
      redirect('/')
      Loading.hide()
    }
  }
}
</script>

<style>
</style>
