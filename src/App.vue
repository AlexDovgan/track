<template>
  <div id="app">
    <b-alert id="info" show :variant='isOnline?"success":"danger"'>
      <b-badge variant="info">
      <h4>
        rss:
        <b>{{ currentData.metadata?currentData.metadata.gateways[0].rssi:0 }}</b>
      </h4>
      </b-badge>
      <b-badge variant="info">
      <h4>
        last online:
        <b>{{ lastOnlineTime.toLocaleString('ru-RU')}}</b>
      </h4>
      </b-badge>
      <b-badge variant="info">
      <h4>
        vbatt:
        <b>{{ vbatt }}</b>
      </h4>
      </b-badge>
    </b-alert>
    <pets-map id="pets-map" />
  </div>
</template>

<script>
import PetsMap from "./components/PetsMap";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      currentData: state => state.currentData,
      isOnline: state => state.isOnline,
      lastOnlineTime: state => state.lastOnlineTime
    }),
    position() {
      return {
        lat: this.currentData.payload_fields.lat,
        lng: this.currentData.payload_fields.long
      };
    },
    vbatt(){
      return  this.currentData.payload_fields.vbatt;
    }
  },
  name: "app",
  components: {
    PetsMap
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0;
}
#app {
  margin: 10px;

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: calc(100% - 20px);
  display: flex;
  flex-flow: column;
  height: 100%;
}
#info{
   flex: 0 1 auto;
   padding: 0;
}
#pets-map
{
    flex: 1 1 auto;
}
.badge{
  display: inline;
  margin: 0 5px;
}
</style>
