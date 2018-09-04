<template>
  <q-page padding class="flex flex-center">
    <q-card inline style="width: 500px; max-width: 90vw;">

      <q-card-title color="primary">
        Log In
      </q-card-title>

      <q-card-main>
        <q-field
          :error="$v.apiKey.$error"
          @blur="$v.apiKey.$touch"
          error-label="You must enter ApiKey">
          <q-input
            float-label="Api Key Id"
            :value="apiKey"
            @input="updateApiKey($event)"/>
        </q-field>

        <q-field
          :error="$v.apiSecret.$error"
          @blur="$v.apiSecret.$touch"
          error-label="You must enter ApiKey">
          <q-input
            :value="apiSecret"
            @input="updateSecretiKey($event)"
            float-label="APi Secret Key"/>
        </q-field>
      </q-card-main>

      <q-card-actions>
        <q-btn @click="submit" color="primary" label="Submit"  />
      </q-card-actions>

    </q-card>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { Loading } from 'quasar'
import { loginActions, loginGetters } from '../store/helpers'

export default {
  name: 'LogIn',
  computed: {
    ...loginGetters
  },
  validations: {
    apiKey: {required},
    apiSecret: {required}
  },
  methods: {
    ...loginActions,
    submit () {
      this.$v.$touch()

      // Check if form is valid
      if (this.$v.$error) {
        this.$q.notify('Please fill all fields')
      } else {
        Loading.show()
        this.getToken()
          .then((data) => {
            this.updateToken(data.data)
            return this.getUserInfo()
          })
          .then((user) => {
            this.updateUser(user.data)
            Loading.hide()
            this.$router.push('/welcome')
          })
          .catch(err => this.$q.notify(err.message))
      }
    }
  },
  preFetch ({store, currentRoute, previousRoute, redirect, ssrContext}) {
    // Handle 'back' usecase:
    // after user already visited welcome page,
    // don't allow to sign in again (only after logout)
    if (store.state.GreenStore.logedIn) {
      redirect('/welcome')
    }
  }
}
</script>
