<template>
  <div class="rightArea">
    <div class="rightTopRow">
      <div class="row">
        <q-btn class="col-3" label="HikService" color="primary" />
        <q-btn class="col-3" label="IISService" color="primary" />
        <q-btn class="col-3" label="NginxService" color="primary" />
        <q-btn class="col-3" label="JarService" color="primary" />
      </div>
    </div>
    <div class="rightTable">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="server-service" label="服务端程序运行情况" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated >
          <q-tab-panel name="server-services" class="q-pa-none">
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
                  <q-tab name="hik-server" label="hik-server" />
                  <q-tab name="iis-server" label="iis-server" />
                  <q-tab name="nginx-server" label="nginx-server" />
                  <q-tab name="jar-service" label="jar-service" />
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="innerTab"
                  animated
                  transition-prev="slide-down"
                  transition-next="slide-up"
                >
                  <q-tab-panel name="inner-hik-server">
                    <div style="white-space: pre-line;">{{hikServerContent}}</div>
                  </q-tab-panel>

                  <q-tab-panel name="inner-iis-server">
                    <div  style="white-space: pre-line;">{{iisServerContent}}</div>
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
export default {
  name: 'ScreenService',
  data () {
    return {
      tab: 'server-services',
      innerTab: 'inner-hik-server',
      splitterModel: 20,
      hikServerContent: '111',
      iisServerContent: '222'
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
