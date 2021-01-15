<template>
  <q-page class="flex flex-lg-center">
    <div class="rightArea">
      <div class="rightTable">
        <q-table
          :columns="nodeTableColumns"
          :data="nodeTableContent"
          :pagination="initialPage1"
        >
          <template v-slot:top>
            <q-btn color="primary" :disable="loading" label="Add row" @click="addNodeRow" />
            <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeNodeRow" />
            <q-space />
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="SELECTED" :props="props">
                <q-checkbox v-model="props.row.selected" dense autofocus />
              </q-td>
              <q-td key="ID" :props="props">
                {{ props.row.id }}
                <q-popup-edit v-model="props.row.id" buttons>
                  <q-input v-model.number="props.row.id" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="NAME" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" buttons>
                  <q-input v-model.number="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="TYPE" :props="props">
                {{ props.row.type }}
                <q-popup-edit v-model="props.row.type" buttons>
                  <q-input v-model.number="props.row.type" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="WALLMODE" :props="props">
                {{ props.row.wallMode }}
                <q-popup-edit v-model="props.row.wallMode" buttons>
                  <q-input v-model.number="props.row.wallMode" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="IMAGE" :props="props">
                {{ props.row.image }}
                <q-popup-edit v-model="props.row.image" buttons>
                  <q-input v-model.number="props.row.image" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="REMARK" :props="props">
                {{ props.row.remark }}
                <q-popup-edit v-model="props.row.remark" buttons>
                  <q-input v-model.number="props.row.remark" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-table
          :columns="serverTableColumns"
          :data="serverTableContent"
          :pagination="initialPage2"
        >
          <template v-slot:top>
            <q-btn color="primary" :disable="loading" label="Add row" @click="addServerRow" />
            <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeServerRow" />
            <q-space />
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="SELECTED" :props="props">
                <q-checkbox v-model="props.row.selected" dense autofocus />
              </q-td>
              <q-td key="NAME" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" buttons>
                  <q-input v-model.number="props.row.name" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="Service" :props="props">
                {{ props.row.service }}
                <q-popup-edit v-model="props.row.service" buttons>
                  <q-input v-model.number="props.row.service" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="q-pa-md">
          <div class="q-gutter-md" style="max-width: 600px">
            <q-input v-model="serverIpText" label="Standard" />
          </div>
          <div class="q-gutter-md" style="max-width: 600px">
            <q-input v-model="hikServerText" label="Secondary" />
          </div>
        </div>
      </div>
      <div class="rightBottom">
        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="row">
          <q-btn class="col-6" label="Submit" type="submit" color="primary"/>
          <q-btn class="col-6" label="Reset" type="reset" color="primary" flat />
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import eventCenter from '../router/eventCenter'
export default {
  name: 'ServerScreen',
  data: function () {
    return {
      serverIpText: 'SERVERIP IP="10.28.120.5"',
      hikServerText: 'HIKSERVER IP="10.28.29.200" PORT="1009"',
      loading: false,
      uploadUrl: '',
      nodeTableInsertRemoveRowId: 0,
      serverTableInsertRemoveRowId: 0,
      initialPage1: {
        descending: false,
        rowsPerPage: 5
      },
      initialPage2: {
        descending: false,
        rowsPerPage: 3
      },
      tableContent: { appNodes: { nodes: [] }, servers: { servers: [] }, serverIP: { ip: '' }, hikServer: { ip: '', port: '' } },
      nodeTableColumns: [
        { name: 'SELECTED', label: 'SELECTED', field: 'selected' },
        { name: 'ID', label: 'ID', field: 'id', sortable: true },
        { name: 'NAME', label: '名称', field: 'name' },
        { name: 'TYPE', label: '第三方屏控厂商', field: 'type' },
        { name: 'WALLMODE', label: '上墙预案', field: 'wallMode' },
        { name: 'IMAGE', label: '屏控应用图标', field: 'image' },
        { name: 'REMARK', label: '备注', field: 'remark' }
      ],
      nodeTableContent: [
        { selected: false, id: '1', name: 'name1', type: 'type1', wallMode: 'wallMode1', image: 'image1', remark: 'remark' },
        { selected: false, id: '2', name: 'name2', type: 'type2', wallMode: 'wallMode1', image: 'image1', remark: 'remark' },
        { selected: false, id: '3', name: 'name3', type: 'type3', wallMode: 'wallMode1', image: 'image1', remark: 'remark' }
      ],
      serverTableColumns: [
        { name: 'SELECTED', label: 'SELECTED', field: 'selected' },
        { name: 'NAME', label: '客户端演示电脑', field: 'name', sortable: true },
        { name: 'Service', label: '客户端屏控服务', field: 'service', sortable: true }
      ],
      serverTableContent: [
        { selected: false, name: '演示电脑1', service: 'http://10.28.111.36:8733/ScreenService' },
        { selected: false, name: '演示电脑2', service: 'http://10.28.111.37:8733/ScreenService' }
      ],
      serverIP: '',
      hikServer: ''
    }
  },
  mounted () {
    console.log('init content mounted begin')
    eventCenter.$on('init-content', inputInit => {
      console.log('listen event of init server content:' + this.initContent)
      if (inputInit.updateUrl === '/api/setServerConfig') {
        this.uploadUrl = inputInit.updateUrl
        this.nodeTableContent = inputInit.initContent.appNodes.nodes
        this.serverTableContent = inputInit.initContent.servers.servers
        this.serverIP = inputInit.initContent.serverIP
        this.hikServer = inputInit.initContent.hikServer
      }
    })
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      this.tableContent.appNodes.nodes = this.nodeTableContent
      this.tableContent.servers.servers = this.serverTableContent
      this.tableContent.serverIP = this.serverIP
      this.tableContent.hikServer = this.hikServer
      this.uploadTableContent(this.uploadUrl, this.tableContent)
    },
    onReset () {
      console.log('trigger reset event')
    },
    uploadTableContent (url, param) {
      // const text = '{"appNodes": {"node": []}, "servers": {"servers": [{"name": "演示电脑2", "service": "http://10.28.111.37:8733/ScreenService"}]}, "serverIP": {"ip": "1"}, "hikServer": {"ip": "123", "port": "2"}}'
      // const input = JSON.parse(text)
      // const ttt = { appNodes: { nodes: [] }, servers: { servers: [] }, serverIP: { ip: '' }, hikServer: { ip: '', port: '' } }
      axios.post(url, this.tableContent)
    },
    addNodeRow () {
      console.log('----------add Node Row----------')
      this.getNodeTableRowIdForInsertRemove()
      console.log('-------insert node table row index---------' + this.nodeTableInsertRemoveRowId)
      const nodeTableRowExample = { selected: false, id: 'idCase', name: 'nameCase', titles: 'titleCase', exeFile: 'exeFileCase', type: 'typeCase', wallMode: 'wallModeCase', image: 'imageCase', remark: 'remarkCase' }
      this.nodeTableContent = [...this.nodeTableContent.slice(0, this.nodeTableInsertRemoveRowId), nodeTableRowExample, ...this.nodeTableContent.slice(this.nodeTableInsertRemoveRowId)]
      console.log(this.nodeTableContent)
    },
    removeNodeRow () {
      const message = confirm('确定删除行吗？')
      if (message === true) {
        console.log('----------remove Node Row----------')
        for (let i = 0; i < this.nodeTableContent.length; i++) {
          if (this.nodeTableContent[i].selected === true) {
            this.nodeTableContent.splice(i, 1)
            i = i - 1
          }
        }
      }
    },
    addServerRow () {
      console.log('----------add Server Row---------')
      this.getServerTableRowIdForInsertRemove()
      console.log('---------insert server table row index-----------' + this.serverTableInsertRemoveRowId)
      const serverTableRowExample = { selected: false, name: '演示电脑Example', service: 'serviceExample' }
      this.serverTableContent = [...this.serverTableContent.slice(0, this.serverTableInsertRemoveRowId), serverTableRowExample, ...this.serverTableContent.slice(this.serverTableInsertRemoveRowId)]
      console.log(this.serverTableContent)
    },
    removeServerRow () {
      const message = confirm('确定删除行吗？')
      if (message === true) {
        console.log('----------remove Server Row---------')
        for (let i = 0; i < this.serverTableContent.length; i++) {
          if (this.serverTableContent[i].selected === true) {
            this.serverTableContent.splice(i, 1)
            i = i - 1
          }
        }
      }
    },
    getNodeTableRowIdForInsertRemove () {
      console.log(this.nodeTableContent)
      this.nodeTableInsertRemoveRowId = this.nodeTableContent.length
      for (let i = 0; i < this.nodeTableContent.length; i++) {
        if (this.nodeTableContent[i].selected === true) {
          this.nodeTableInsertRemoveRowId = i + 1
        }
      }
    },
    getServerTableRowIdForInsertRemove () {
      console.log(this.serverTableContent)
      this.serverTableInsertRemoveRowId = this.serverTableContent.length
      for (let i = 0; i < this.serverTableContent.length; i++) {
        if (this.serverTableContent[i].selected === true) {
          this.serverTableInsertRemoveRowId = i + 1
        }
      }
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

  .rightTable{
    flex:1;
    display:flex;
    flex-direction:column;
    overflow:auto;
  }

  .rightBottom{
    flex:0 0 0px
  }
</style>
