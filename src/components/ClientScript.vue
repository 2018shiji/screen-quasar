<template>
  <div class="rightArea">
  <div class="rightTopRow">
    <div class="row">
      <q-btn @click="startUpWebApp()" class="col-3">启动Web程序</q-btn>
      <q-btn @click="killAllWebApp()" class="col-3">关闭所有Web程序</q-btn>
      <q-btn @click="startUpVideoApp()" class="col-3">启动Video程序</q-btn>
      <q-btn @click="killAllVideoApp()" class="col-3">关闭所有Video程序</q-btn>
    </div>
  </div>
  <div class="rightTable" >
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="mails" label="命令行调用结果" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated >
        <q-tab-panel name="mails" class="q-pa-none">
          <q-splitter
            v-model="splitterModel"
            style="height: 487px"
          >
            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal"
              >
                <q-tab name="innerMails" label="应用程序调用结果" />
                <q-tab name="innerAlarms" label="大屏控制调用结果" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="innerMails">
                  <div style="white-space: pre-line;">{{appCmdContent}}</div>
                </q-tab-panel>

                <q-tab-panel name="innerAlarms">
                  <div  style="white-space: pre-line;">{{ctrlCmdContent}}</div>
                </q-tab-panel>

              </q-tab-panels>
            </template>
          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import eventCenter from '../router/eventCenter'
export default {
  name: 'ClientScript',
  data () {
    return {
      appText: '脚本启动程序调用：',
      ctrlText: '屏控软件程序调用：',
      appCmdContent: '应用程序启动脚本中控制台的输出内容\n',
      ctrlCmdContent: '屏控软件启动脚本中控制台的输出内容\n',
      buttonColor: 'primary',
      webAppUrl: '/clientScript/startUpWebPage',
      killAllWebAppUrl: '/clientScript/taskKillAllWebPage',
      videoAppUrl: '/clientScript/startUpVideoApp',
      killAllVideoAppUrl: '/clientScript/taskKillAllVideo',
      tab: 'mails',
      innerTab: 'innerMails',
      splitterModel: 20,
      websocketProxy: null
    }
  },
  mounted () {
    console.log('client script mounted begin')
    eventCenter.$on('init-inputParams', inputInit => {
      console.log(inputInit)
    })
    this.initWebSocket()
  },
  methods: {
    startUpWebApp () {
      console.log('startUpWebApp')
      axios
        .get(this.webAppUrl)
        .then(response => {
          console.log(response)
        })
    },
    killAllWebApp () {
      console.log('killAllWebApp')
      axios
        .get(this.killAllWebAppUrl)
        .then(response => {
          console.log(response)
        })
    },
    startUpVideoApp () {
      console.log('startUpVideoApp')
      axios
        .get(this.videoAppUrl)
        .then(response => {
          console.log(response)
        })
    },
    killAllVideoApp () {
      console.log('killAllVideoApp')
      axios
        .get(this.killAllVideoAppUrl)
        .then(response => {
          console.log(response)
        })
    },
    initWebSocket () {
      // this.websocketProxy = new WebSocket('ws://10.28.111.36:20012/websocket/asset')
      this.websocketProxy = new WebSocket('ws://192.168.43.110:20012/websocket/asset')
      this.websocketProxy.onopen = this.websocketOnOpen
      this.websocketProxy.onmessage = this.websocketOnMessage
      this.websocketProxy.onclose = this.websocketOnClose
      this.websocketProxy.onerror = this.websocketOnError
      this.websocketProxy.unload = function () {
        this.websocketProxy.close()
      }
    },
    websocketOnOpen () {
      console.log('建立连接')
    },
    websocketOnMessage (msg) {
      this.appCmdContent = this.appCmdContent + msg.data
      this.ctrlCmdContent = this.ctrlCmdContent + msg.data
      console.log('Socket 收到消息' + msg.data)
    },
    websocketOnClose () {
      console.log('Socket 已关闭')
    },
    websocketOnError () {
      console.log('Socket 发生了错误')
    }
  }
}
</script>

<style scoped>
  .rightArea{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .rightTopRow{
    flex:0 0 0px
  }
  .rightTable{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
</style>
