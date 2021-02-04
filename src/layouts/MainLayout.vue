<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>

        <q-tree
          :nodes="simple"
          selected-color="blue"
          node-key="label"
          :selected.sync="selected">
        </q-tree>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'
import eventCenter from './../router/eventCenter.js'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      selected: '',
      toEmit: {
        initUrl: '',
        updateUrl: '',
        initContent: ''
      },
      simple: [
        {
          label: '屏控配置中心',
          children: [
            { handler: (node) => this.handleClick(node), label: '服务端屏控配置', url: 'serverConfig', initUrl: '/serverCtrl/getServerConfig', updateUrl: '/serverCtrl/setServerConfig' },
            { handler: (node) => this.handleClick(node), label: '客户端屏控配置', url: 'clientConfig', initUrl: '/clientCtrl/getClientConfig', updateUrl: '/clientCtrl/setClientConfig' }
          ]
        },
        {
          label: '预案管理',
          children: [
            { handler: (node) => this.handleClick(node), label: '1号预案', url: 'clientPlan1', initUrl: '/clientCtrl/getPlan1', updateUrl: '/clientCtrl/setPlan1' },
            { handler: (node) => this.handleClick(node), label: '2号预案', url: 'clientPlan2', initUrl: '/clientCtrl/getPlan2', updateUrl: '/clientCtrl/setPlan2' },
            { handler: (node) => this.handleClick(node), label: '3号预案', url: 'clientPlan3', initUrl: '/clientCtrl/getPlan3', updateUrl: '/clientCtrl/setPlan3' }
          ]
        },
        {
          label: '服务调控',
          children: [
            { handler: (node) => this.handleClick(node), label: '客户端服务调控', url: 'clientScript', initUrl: '', updateUrl: '' }
          ]
        },
        {
          label: '屏控界面',
          children: [
            { handler: (node) => this.handleClick(node), label: '屏控界面跳转', url: 'screenControl', initUrl: '', updateUrl: '' }
          ]
        },
        {
          label: '视频配置控制',
          children: [
            { handler: (node) => this.handleClick(node), label: '视频配置', url: 'videoConfig', initUrl: '/clientCtrl/getVideoItemList', updateUrl: '/clientCtrl/setVideoItemList' },
            { handler: (node) => this.handleClick(node), label: '视频控制', url: 'videoControl', initUrl: '/clientCtrl/getVideoPlayingItemList', updateUrl: '/clientCtrl/videoControl' }
          ]
        },
        {
          label: '服务在线情况',
          children: [
            { handler: (node) => this.handleClick(node), label: '服务端服务在线情况', url: 'serverService', initUrl: '', updateUrl: '' },
            { handler: (node) => this.handleClick(node), label: '客户端服务在线情况', url: 'clientService', initUrl: '', updateUrl: '' }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick (node) {
      console.log(`node: ${JSON.stringify(node)}`)
      if (node.initUrl !== '' && node.updateUrl !== '') {
        this.initInput(node.initUrl, node.updateUrl)
      }
      this.$router.push(node.url)
    },
    async initInput (initUrl, updateUrl) {
      console.log('init table content')
      console.log(initUrl)
      const response = await axios.get(initUrl)
      console.log(response.data)
      console.log('getInputParams response(data length):' + response.data.length)
      this.toEmit.updateUrl = updateUrl
      this.toEmit.initContent = response.data
      eventCenter.$emit('init-content', this.toEmit)
    }
  }
}
</script>
