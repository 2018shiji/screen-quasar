<template>
  <div>
    <div class="rightArea">
      <q-input v-model="globalCfg.serverCfgUrl" label="ServerCfgUrl"></q-input>
      <q-input v-model="globalCfg.clientCfgUrl" label="ClientCfgUrl"></q-input>
      <q-input v-model="globalCfg.clientCtrlIp" label="ClientCtrlIp"></q-input>
      <q-input v-model="globalCfg.videoListUrl" label="VideoListUrl"></q-input>
    </div>
    <div class="rightBottom">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="row">
        <q-btn class="col-6" label="Submit" type="submit" color="primary"/>
        <q-btn class="col-6" label="Reset" type="reset" color="primary" flat />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import eventCenter from '../router/eventCenter'
export default {
  name: 'GlobalConfig',
  data () {
    return {
      serverUpdateUrl: '/serverCtrl/setGlobalConfig',
      clientUpdateUrl: '/clientCtrl/setGlobalConfig',
      globalCfg: { serverCfgUrl: '', clientCfgUrl: '', clientCtrlIp: '', videoListUrl: '' }
    }
  },
  mounted () {
    eventCenter.$on('init-content', inputContent => {
      console.log(inputContent)
      if (inputContent.updateUrl === '/serverCtrl/setGlobalConfig' && ((this.globalCfg.serverCfgUrl === '') ||
        (this.globalCfg.clientCfgUrl === '') || (this.globalCfg.clientCtrlIp === '') || (this.globalCfg.videoListUrl === ''))) {
        this.globalCfg = inputContent.initContent === '' ? this.globalCfg : inputContent.initContent
      }
    })
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      axios.post(this.serverUpdateUrl, this.globalCfg)
      axios.post(this.clientUpdateUrl, this.globalCfg)
    },
    onReset () {
      console.log('trigger reset event')
    }
  }
}
</script>

<style scoped>
  .rightArea{
    flex:1;
    display:flex;
    flex-direction:column;
    overflow: auto;
  }

  .rightBottom{
    flex:0 0 0px
  }
</style>
