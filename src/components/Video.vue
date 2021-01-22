<template>
    <div class="rightArea">
      <div class="row">
        <q-btn class="col-2" label="启动" color="primary" @click="bootstrapVideo" />
        <q-btn class="col-2" label="播放" color="primary" @click="playVideo" />
        <q-btn class="col-2" label="暂停" color="primary" @click="pauseVideo" />
        <q-btn class="col-2" label="重来" color="primary" @click="rewindVideo" />
        <q-btn class="col-2" label="调试" color="primary" @click="visibleCtrlPanel" />
        <q-btn class="col-2" label="展示" color="primary" @click="invisibleCtrlPanel" />
      </div>
      <div class="rightTable">
        <q-table
          title="Video"
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
              <q-td key="DESCRIPTION" :props="props">
                {{ props.row.description }}
                <q-popup-edit v-model="props.row.description" buttons>
                  <q-input v-model.number="props.row.description" dense autofocus />
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
export default {
  name: 'Video',
  data () {
    return {
      updateUrl: '/api/setVideoItemList',
      insertRemoveRowId: 0,
      initialPagination: {
        descending: false,
        rowsPerPage: 7
      },
      playItemColumns: [
        { name: 'SELECTED', label: 'SELECTED', field: 'selected' },
        { name: 'MRL', label: '视频路径', field: 'mrl' },
        { name: 'DESCRIPTION', label: '内容描述', field: 'description' },
        { name: 'OPTIONS', label: '附加选项', field: 'options' }
      ],
      playItemContent: [
        { selected: false, mrl: 'rtmp://58.200.131.2:1935/livetv/gdtv', description: '测试视频（广东卫视）', options: '{"video-filter=motionblur",  "network-caching=2000", "no-plugins-cache"}' },
        { selected: false, mrl: 'C:\\Users\\lizhuangjie.chnet\\Pictures\\高清视频测试报告\\附件2-不同摄像头视频回传\\大华摄像头.mp4', description: '测试视频（大华摄像头）', options: '' },
        { selected: false, mrl: 'C:\\Users\\lizhuangjie.chnet\\Pictures\\高清视频测试报告\\附件2-不同摄像头视频回传\\海康摄像头.mp4', description: '测试视频（海康摄像头）', options: '' }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('trigger submit event')
      axios.post(this.updateUrl, this.playItemContent)
    },
    onReset () {
      console.log('trigger reset event')
    },
    bootstrapVideo () {
      axios.get('/api/bootstrapVideo')
    },
    playVideo () {
      axios.get('/api/playVideo')
    },
    pauseVideo () {
      axios.get('/api/pauseVideo')
    },
    rewindVideo () {
      axios.get('/api/rewindVideo')
    },
    visibleCtrlPanel () {
      axios.get('/api/visibleCtrlPanel')
    },
    invisibleCtrlPanel () {
      axios.get('/api/invisibleCtrlPanel')
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
