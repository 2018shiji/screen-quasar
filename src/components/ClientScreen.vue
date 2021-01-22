<template>
  <q-page class="flex flex-lg-center">
    <div class="rightArea">
      <div class="rightTable">
        <q-table
          title="QDataTable with QPopupEdit"
          :columns="nodeTableColumns"
          :data="nodeTableContent"
          :pagination="initialPagination"
        >
          <template v-slot:top>
            <q-btn color="primary" label="Add row" @click="addRow" />
            <q-btn class="q-ml-sm" color="primary" label="Remove row" @click="removeRow" />
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
              <q-td key="TITLES" :props="props">
                {{ props.row.titles }}
                <q-popup-edit v-model="props.row.titles" buttons>
                  <q-input v-model.number="props.row.titles" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="EXEFILE" :props="props">
                {{ props.row.exeFile }}
                <q-popup-edit v-model="props.row.exeFile" buttons>
                  <q-input v-model.number="props.row.exeFile" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="PARAMS" :props="props">
                {{ props.row.params }}
                <q-popup-edit v-model="props.row.params" buttons>
                  <q-input v-model.number="props.row.params" dense autofocus />
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
  name: 'ClientScreen',
  data () {
    return {
      updateUrl: '',
      insertRemoveRowId: 0,
      initialPagination: {
        descending: false,
        rowsPerPage: 7
      },
      nodeTableColumns: [
        { name: 'SELECTED', label: 'SELECTED', field: 'selected' },
        { name: 'ID', label: 'ID', field: 'id', sortable: true },
        { name: 'TITLES', label: '标题', field: 'titles' },
        { name: 'EXEFILE', label: '执行程序', field: 'exeFile' },
        { name: 'PARAMS', label: '附加参数', field: 'params' },
        { name: 'REMARK', label: '备注', field: 'remark' }
      ],
      nodeTableContent: [
        { selected: false, id: 'HX1F_S1', titles: '10.28.120.5', exeFile: 'default', params: 'default', remark: 'AR' },
        { selected: false, id: 'HX1F_S2', titles: '无人驾驶', exeFile: 'default', params: 'default', remark: '无人集卡录像' },
        { selected: false, id: 'HX1F_S3', titles: '无人机', exeFile: 'default', params: 'default', remark: '无人机录像' },
        { selected: false, id: 'HX1F_S4', titles: '机器人', exeFile: 'default', params: 'default', remark: '机器人' },
        { selected: false, id: 'HX1F_S5', titles: '在港船舶实时监控', exeFile: 'default', params: 'default', remark: '北斗_AIS/GIS' },
        { selected: false, id: 'HX1F_S6', titles: '安全监控', exeFile: 'default', params: 'default', remark: '安全监控' },
        { selected: false, id: 'HX1F_S7', titles: '妈湾智慧港 综合管理平台', exeFile: 'default', params: 'default', remark: 'ePort' },
        { selected: false, id: 'HX1F_S8', titles: '招商水印', exeFile: 'default', params: 'default', remark: 'HX视频' }
      ],
      tableContent: { nodes: [] }
    }
  },
  mounted () {
    console.log('init content mounted begin')
    eventCenter.$on('init-content', inputInit => {
      if (inputInit.updateUrl === '/clientCtrl/setClientConfig') {
        this.updateUrl = inputInit.updateUrl
        this.nodeTableContent = inputInit.initContent.nodes
      }
      console.log('listen event of init client content: ' + this.initContent)
    })
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      this.tableContent.nodes = this.nodeTableContent
      axios.post(this.updateUrl, this.tableContent)
    },
    onReset () {
      console.log('trigger reset event')
    },
    uploadTableContent (url, param) {
      axios.post(url, param)
    },
    addRow () {
      console.log('----------add Row----------')
      this.getRowIdForInsertRemove()
      console.log('--------insert row index-------' + this.insertRemoveRowId)
      const tableRowExample = { selected: false, id: 'idCase', name: 'nameCase', titles: 'titleCase', exeFile: 'exeFileCase', type: 'typeCase', wallMode: 'wallModeCase', image: 'imageCase', remark: 'remarkCase' }
      this.nodeTableContent = [...this.nodeTableContent.slice(0, this.insertRemoveRowId), tableRowExample, ...this.nodeTableContent.slice(this.insertRemoveRowId)]
      console.log(this.nodeTableContent)
    },
    removeRow () {
      const message = confirm('确定删除行吗？')
      if (message === true) {
        console.log('----------remove Row----------')
        for (let i = 0; i < this.nodeTableContent.length; i++) {
          if (this.nodeTableContent[i].selected === true) {
            this.nodeTableContent.splice(i, 1)
            i = i - 1
          }
        }
      }
    },
    getRowIdForInsertRemove () {
      console.log(this.nodeTableContent)
      this.insertRemoveRowId = this.nodeTableContent.length
      for (let i = 0; i < this.nodeTableContent.length; i++) {
        if (this.nodeTableContent[i].selected === true) {
          this.insertRemoveRowId = i + 1
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
