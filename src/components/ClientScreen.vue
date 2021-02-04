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
            <q-btn class="q-ml-sm" color="primary" label="Remove row" @click="removeRow" />
            <q-space />
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
              </q-td>
              <q-td key="SELECTED" :props="props">
                <q-checkbox v-model="props.row.selected" dense autofocus />
              </q-td>
              <q-td key="ID" :props="props">
                {{props.row.id}}
              </q-td>
              <q-td key="TITLES" :props="props">
                {{ props.row.titles }}
                <q-popup-edit v-model="props.row.titles" buttons>
                  <q-input v-model="props.row.titles" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="EXEFILE" :props="props">
                {{ props.row.exeFile }}
                <q-popup-edit v-model="props.row.exeFile" buttons>
                  <q-input v-model="props.row.exeFile" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="PARAMS" :props="props">
                {{ props.row.params }}
                <q-popup-edit v-model="props.row.params" buttons>
                  <q-input v-model="props.row.params" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="REMARK" :props="props">
                {{ props.row.remark }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="row">
                  <q-input class="col-6" rounded v-model="props.row.appType" label="应用载体"></q-input>
                  <q-input class="col-6" rounded v-model="props.row.windowTitle" label="窗口标题"></q-input>
                </div>
                <div class="row">
                  <q-input class="col-12" rounded v-model="props.row.url" label="资源路径"></q-input>
                </div>
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
      text: '测试文本',
      updateUrl: '/clientCtrl/setClientConfig',
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
      nodeTableContent: [],
      tableContent: { nodes: [] }
    }
  },
  mounted () {
    console.log('init content mounted begin')
    eventCenter.$on('init-content', inputInit => {
      if (inputInit.updateUrl === '/clientCtrl/setClientConfig' && this.nodeTableContent.length === 0) {
        this.updateUrl = inputInit.updateUrl
        this.nodeTableContent = inputInit.initContent.nodes
      }
      console.log('listen event of init client content: ' + this.initContent)
    })
    eventCenter.$on('server-client-newlyAdded', content => {
      console.log(content)
      if (content.length !== 0) {
        for (let i = 0; i < content.length; i++) {
          console.log('00000000' + content[i])
          this.addRow(content[i])
        }
      }
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
    addRow (row) {
      console.log('----------add Row----------')
      this.getRowIdForInsertRemove()
      console.log('--------insert row index-------' + this.insertRemoveRowId)
      this.nodeTableContent = [...this.nodeTableContent.slice(0, this.insertRemoveRowId), row, ...this.nodeTableContent.slice(this.insertRemoveRowId)]
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
