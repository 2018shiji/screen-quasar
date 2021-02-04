<template>
  <q-page class="flex flex-lg-center">
    <div class="rightArea">
      <div class="rightTable">
        <q-table
          title="QDataTable with QPopupEdit"
          :columns="nodeTableColumns"
          :data="nodeTableContent"
          :pagination="initialPagination"
          row-key="name"
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
                  <q-input v-model="props.row.id" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="REMARK" :props="props">
                {{ props.row.remark }}
                <q-popup-edit v-model="props.row.remark" buttons>
                  <q-input v-model="props.row.remark" dense autofocus />
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
import eventCenter from '../../router/eventCenter'
export default {
  name: 'Plan2',
  data () {
    return {
      clientUpdateUrl: '/clientCtrl/setClientPlan2',
      serverUpdateUrl: '/serverCtrl/setServerPlan2',
      insertRemoveRowId: 0,
      initialPagination: {
        descending: false,
        rowsPerPage: 7
      },
      nodeTableColumns: [
        { name: 'SELECTED', label: 'SELECTED', field: 'selected' },
        { name: 'ID', label: 'ID', field: 'id', sortable: true },
        { name: 'REMARK', label: '备注', field: 'remark' }
      ],
      nodeTableContent: [],
      tableContent: { nodes: [] }
    }
  },
  mounted () {
    console.log('init client content2 mounted begin')
    eventCenter.$on('init-content', inputInit => {
      if (inputInit.updateUrl === '/clientCtrl/setPlan2' && this.nodeTableContent.length === 0) {
        this.nodeTableContent = inputInit.initContent.nodes
      }
      console.log('listen event of init content2: ' + this.initContent)
    })
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      this.tableContent.nodes = this.nodeTableContent
      this.uploadClientContent(this.clientUpdateUrl, this.tableContent)
      this.uploadServerContent(this.serverUpdateUrl, this.tableContent)
    },
    onReset () {
      console.log('trigger reset event')
    },
    uploadClientContent (url, param) {
      axios.post(url, param)
    },
    uploadServerContent (url, param) {
      axios.post(url, param)
    },
    addRow () {
      console.log('----------add Row----------')
      this.getRowIdForInsertRemove()
      console.log('--------insert row index-------' + this.insertRemoveRowId)
      const tableRowExample = { selected: false, id: 'idCase' }
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
