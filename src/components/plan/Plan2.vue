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
          style="height: 500px"
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
              <q-td key="NAME" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name" buttons>
                  <q-input v-model.number="props.row.name" dense autofocus />
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
import eventCenter from '../../router/eventCenter'
export default {
  name: 'Plan2',
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
        { name: 'NAME', label: '名称', field: 'name' },
        { name: 'TITLES', label: '标题', field: 'titles' },
        { name: 'EXEFILE', label: '执行程序', field: 'exeFile' },
        { name: 'REMARK', label: '备注', field: 'remark' }
      ],
      nodeTableContent: [
        { selected: false, id: '1', name: 'name1', titles: 'title1', exeFile: 'exeFile1', type: 'type1', remark: 'remark' },
        { selected: false, id: '2', name: 'name2', titles: 'title2', exeFile: 'exeFile2', type: 'type2', remark: 'remark' },
        { selected: false, id: '3', name: 'name3', titles: 'title3', exeFile: 'exeFile3', type: 'type3', remark: 'remark' }
      ],
      tableContent: { nodes: [] }
    }
  },
  mounted () {
    console.log('init client content2 mounted begin')
    eventCenter.$on('init-content', inputInit => {
      if (inputInit.updateUrl === '/api/setClientConfig2') {
        this.updateUrl = inputInit.updateUrl
        this.nodeTableContent = inputInit.initContent.nodes
      }
      console.log('listen event of init client content2: ' + this.initContent)
    })
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      this.tableContent.nodes = this.nodeTableContent
      this.uploadTableContent(this.updateUrl, this.tableContent)
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
