<template>
  <q-page padding class="flex flex-center">
    <q-card inline style="width: 500px; max-width: 90vw;">

      <q-card-title color="primary">
        Welcome
      </q-card-title>

      <q-card-main>
        <p>name: {{user.firstName}} {{user.lastName}}</p>
        <p>email: {{user.email}}</p>
      </q-card-main>

      <q-card-actions>
        <q-btn flat color="primary" label="Log Out" @click="logOut" />
      </q-card-actions>

    </q-card>
  </q-page>
</template>

<script>
import { welcomeGetters } from '../store/helpers'

export default {
  name: 'Welcome',
  computed: {
    ...welcomeGetters
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push('/')
    }
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    if (!store.state.GreenStore.token) {
      redirect('/')
    }
  }
}
</script>

<style>
</style>
