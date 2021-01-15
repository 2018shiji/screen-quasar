<template>
  <div class="rightArea">
  <div class="rightTopRow">
    <div class="row">
      <q-btn :loading="appLoading" :color="buttonColor" @click="startupAppScript(appUrl)" class="col-6">
      应用程序
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
      </template>
      </q-btn>
      <q-btn :loading="ctrlLoading" :color="buttonColor" @click="startUpCtrlScript(ctrlUrl)" class="col-6">
      屏控软件
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
      </template>
      </q-btn>
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
                <q-tab name="innerMails" icon="mail" label="App Record" @click="triggerAppEvent"/>
                <q-tab name="innerAlarms" icon="alarm" label="Ctrl Record" @click="triggerCtrlEvent" />
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
                  <div id="AppCommandContent">{{appCmdContent}}</div>
                </q-tab-panel>

                <q-tab-panel name="innerAlarms">
                  <div id="CtrlCommandContent">{{ctrlCmdContent}}</div>
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
      appOrCtrl: true,
      appCmdContent: '应用程序启动脚本中控制台的输出内容',
      ctrlCmdContent: '屏控软件启动脚本中控制台的输出内容',
      buttonColor: 'primary',
      appUrl: '/script/startUpAppScript',
      ctrlUrl: '/script/startUpCtrlScript',
      appLoading: false,
      ctrlLoading: false,
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
    startupAppScript (appUrl) {
      this.appOrCtrl = true
      this.appLoading = true
      console.log('发送运行应用程序启动脚本的请求')
      axios
        .get(appUrl)
        .then(response => {
          console.log(response)
          this.appLoading = false
        })
    },
    startUpCtrlScript (ctrlUrl) {
      this.appOrCtrl = false
      this.ctrlLoading = true
      console.log('发送运行屏控程序启动脚本的请求')
      axios
        .get(ctrlUrl)
        .then(response => {
          console.log(response)
          this.ctrlLoading = false
        })
    },
    triggerAppEvent () {
      console.log(this.appCmdContent)
      document.getElementById('AppCommandContent').innerHTML = this.appCmdContent
    },
    triggerCtrlEvent () {
      console.log(this.ctrlCmdContent)
      document.getElementById('CtrlCommandContent').innerHTML = this.ctrlCmdContent
    },
    initWebSocket () {
      this.websocketProxy = new WebSocket('ws://localhost:8084/websocket/asset')
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
      if (this.appOrCtrl === true) {
        this.appCmdContent = this.appCmdContent + msg.data
        document.getElementById('AppCommandContent').innerHTML = this.appCmdContent
      } else if (this.appOrCtrl === false) {
        this.ctrlCmdContent = this.ctrlCmdContent + msg.data
        document.getElementById('CtrlCommandContent').innerHTML = this.ctrlCmdContent
      }
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
