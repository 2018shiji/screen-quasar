<template>
  <div>
    <q-btn class="col-6" label="ClientScreen" color="primary" @click="clientScreenSurvive">{{clientScreen}}</q-btn>
    <q-btn class="col-6" label="ClientService2" color="primary" />
    <q-btn class="col-6" label="ClientService3" color="primary" />
    <q-btn class="col-6" label="ClientService4" color="primary" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ClientService',
  data () {
    return {
      clientScreen: false
    }
  },
  methods: {
    clientScreenSurvive () {
      axios
        .get('/clientScript/clientScreenSurvive')
        .then(response => {
          console.log(response)
          this.clientScreen = response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
