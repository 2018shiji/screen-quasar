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
          label: '基本配置',
          children: [
            { handler: (node) => this.handleClick(node), label: '客户端基本配置', url: 'clientConfig', initUrl: '/api/getClientConfig', updateUrl: '/api/setClientConfig' },
            { handler: (node) => this.handleClick(node), label: '服务端基本配置', url: 'serverConfig', initUrl: '/api/getServerConfig', updateUrl: '/api/setServerConfig' },
            { handler: (node) => this.handleClick(node), label: '测试路径', url: 'test', initUrl: '/api/getTestConfig', updateUrl: '/api/setTestConfig' },
            { handler: (node) => this.handleClick(node), label: '测试添加行路径', url: 'testAddRow', initUrl: '/api/getTestAddRowConfig', updateUrl: '/api/setTestAddRowConfig' },
            { handler: (node) => this.handleClick(node), label: '测试多选框路径', url: 'testMultiCheckBox', initUrl: '/api/getTestMultiCheckBoxConfig', updateUrl: '/api/setTestMultiCheckBoxConfig' }
          ]
        },
        {
          label: '预案管理',
          children: [
            { handler: (node) => this.handleClick(node), label: '1号预案', url: 'clientPlan1', initUrl: '/api/getClientPlan1', updateUrl: '/api/setClientPlan1' },
            { handler: (node) => this.handleClick(node), label: '2号预案', url: 'clientPlan2', initUrl: '/api/getClientPlan2', updateUrl: '/api/setClientPlan2' },
            { handler: (node) => this.handleClick(node), label: '3号预案', url: 'clientPlan3', initUrl: '/api/getClientPlan3', updateUrl: '/api/setClientPlan3' },
            { handler: (node) => this.handleClick(node), label: '4号预案', url: 'clientPlan4', initUrl: '/api/getClientPlan4', updateUrl: '/api/setClientPlan4' },
            { handler: (node) => this.handleClick(node), label: '5号预案', url: 'clientPlan5', initUrl: '/api/getClientPlan5', updateUrl: '/api/setClientPlan5' },
            { handler: (node) => this.handleClick(node), label: '6号预案', url: 'clientPlan6', initUrl: '/api/getClientPlan6', updateUrl: '/api/setClientPlan6' },
            { handler: (node) => this.handleClick(node), label: '7号预案', url: 'clientPlan7', initUrl: '/api/getClientPlan7', updateUrl: '/api/setClientPlan7' }
          ]
        },
        {
          label: '脚本启动',
          children: [
            { handler: (node) => this.handleClick(node), label: '客户端启动脚本', url: 'clientScript', initUrl: '/script/getClientScript', updateUrl: '/script/setClientScript' },
            { handler: (node) => this.handleClick(node), label: '服务端启动脚本', url: 'serverScript', initUrl: '', updateUrl: '' }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick (node) {
      console.log(`node: ${JSON.stringify(node)}`)
      this.initInput(node.initUrl, node.updateUrl)
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
