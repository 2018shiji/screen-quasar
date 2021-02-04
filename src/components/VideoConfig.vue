<template>
    <div class="rightArea">
      <div class="rightTable">
        <q-table
          title="VideoConfig"
          :columns="playItemColumns"
          :data="playItemContent"
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
              <q-td key="MRL" :props="props">
                {{ props.row.mrl }}
                <q-popup-edit v-model="props.row.mrl" buttons>
                  <q-input v-model.number="props.row.mrl" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="TITLE" :props="props">
                {{ props.row.title }}
                <q-popup-edit v-model="props.row.title" buttons>
                  <q-input v-model.number="props.row.title" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="VOLUME" :props="props">
                {{ props.row.volume }}
                <q-popup-edit v-model="props.row.volume" buttons>
                  <q-input v-model.number="props.row.volume" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="OPTIONS" :props="props">
                {{ props.row.options }}
                <q-popup-edit v-model="props.row.options" buttons>
                  <q-input v-model.number="props.row.options" dense autofocus />
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

</template>

<script>
import axios from 'axios'
import eventCenter from '../router/eventCenter'
export default {
  name: 'Video',
  data () {
    return {
      updateUrl: '/clientCtrl/setVideoItemList',
      insertRemoveRowId: 0,
      initialPagination: {
        descending: false,
        rowsPerPage: 7
      },
      playItemColumns: [
        { name: 'SELECTED', label: 'SELECTED', field: 'selected' },
        { name: 'MRL', label: '视频路径', field: 'mrl' },
        { name: 'TITLE', label: '视频标题', field: 'title' },
        { name: 'VOLUME', label: '音量', field: 'volume' },
        { name: 'OPTIONS', label: '附加选项', field: 'options' }
      ],
      playItemContent: []
    }
  },
  mounted () {
    console.log('init video config content')
    eventCenter.$on('init-content', inputInit => {
      if (inputInit.updateUrl === '/clientCtrl/setVideoItemList' && this.playItemContent.length === 0) {
        this.playItemContent = inputInit.initContent
      }
    })
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      axios.post(this.updateUrl, this.playItemContent)
    },
    onReset () {
      console.log('trigger reset event')
    },
    addRow () {
      console.log('----------add Row----------')
      this.getRowIdForInsertRemove()
      console.log('--------insert row index-------' + this.insertRemoveRowId)
      const tableRowExample = { selected: false, mrl: '路径', description: '内容描述', options: '' }
      this.playItemContent = [...this.playItemContent.slice(0, this.insertRemoveRowId), tableRowExample, ...this.playItemContent.slice(this.insertRemoveRowId)]
      console.log(this.playItemContent)
    },
    removeRow () {
      const message = confirm('确定删除行吗？')
      if (message === true) {
        console.log('----------remove Row----------')
        for (let i = 0; i < this.playItemContent.length; i++) {
          if (this.playItemContent[i].selected === true) {
            this.playItemContent.splice(i, 1)
            i = i - 1
          }
        }
      }
    },
    getRowIdForInsertRemove () {
      this.insertRemoveRowId = this.playItemContent.length
      for (let i = 0; i < this.playItemContent.length; i++) {
        if (this.playItemContent[i].selected === true) {
          this.playItemContent = i + 1
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
</style>
