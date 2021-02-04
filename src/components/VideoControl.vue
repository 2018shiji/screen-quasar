<template>
  <div class="rightArea">
  <div class="rightTable">
    <q-table
      title="VideoControl"
      :columns="playItemColumns"
      :data="playItemContent"
      :pagination="initialPagination"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ID" :props="props">
            <q-banner>{{props.row.id}}</q-banner>
          </q-td>
          <q-td key="TITLE" :props="props">
            <q-banner>{{props.row.title}}</q-banner>
          </q-td>
          <q-td key="REWIND" :props="props">
            <q-btn flat icon="directions" @click="startVideo(props.row.id)"/>
          </q-td>
          <q-td key="PLAY" :props="props">
            <q-btn flat icon="send" @click="playVideo(props.row.id)"/>
          </q-td>
          <q-td key="STOP" :props="props">
            <q-btn flat icon="layers_clear" @click="pauseVideo(props.row.id)"/>
          </q-td>
          <q-td key="STATUS" :props="props">
            <q-btn flat icon="my_location"/>
<!--            <q-btn :label=props.row.status />-->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import eventCenter from '../router/eventCenter'

export default {
  name: 'VideoControl',
  data () {
    return {
      initialPagination: {
        descending: false,
        rowsPerPage: 7
      },
      playItemColumns: [
        { name: 'ID', label: 'ID', align: 'center', field: 'id' },
        { name: 'TITLE', label: '视频标题', align: 'center', field: 'title' },
        { name: 'REWIND', label: '启动', align: 'center', field: 'rewind' },
        { name: 'PLAY', label: '播放', align: 'center', field: 'play' },
        { name: 'STOP', label: '暂停', align: 'center', field: 'stop' },
        { name: 'STATUS', label: '状态', align: 'center', field: 'status' }
      ],
      playItemContent: []
    }
  },
  mounted () {
    console.log('init video control content')
    eventCenter.$on('init-content', inputInit => {
      if (inputInit.updateUrl === '/clientCtrl/videoControl') {
        this.playItemContent = inputInit.initContent
      }
    })
  },
  methods: {
    startVideo (id) {
      axios.get('/clientCtrl/startVideo', {
        params: {
          id: id
        }
      })
    },
    playVideo (id) {
      axios.get('/clientCtrl/playVideo', {
        params: {
          id: id
        }
      })
    },
    pauseVideo (id) {
      axios.get('/clientCtrl/pauseVideo', {
        params: {
          id: id
        }
      })
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
