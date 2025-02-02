<template>
  <div id="app">
    <b-alert id="info" show :variant="isOnline ? 'success' : 'danger'">
      <b-badge variant="info">
        <h4>
          rssi:
          <b>{{ rssi }}</b>
        </h4>
      </b-badge>
      <b-badge variant="info">
        <h4>
          snr:
          <b>{{ snr }}</b>
        </h4>
      </b-badge>
      <b-badge variant="info">
        <h4>
          last online:
          <b>{{ lastOnlineTime.toLocaleString("ru-RU") }}</b>
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
      currentData: (state) => state.currentData,
      isOnline: (state) => state.isOnline,
      lastOnlineTime: (state) => state.lastOnlineTime,
    }),
    rssi() {
      return this.currentData.uplink_message.rx_metadata
        ? this.currentData.uplink_message.rx_metadata[0].rssi
        : 0;
    },
    snr() {
      return this.currentData.uplink_message.rx_metadata
        ? this.currentData.uplink_message.rx_metadata[0].snr
        : 0;
    },
    position() {
      return {
        lat: this.currentData.uplink_message.decoded_payload.lat,
        lng: this.currentData.uplink_message.decoded_payload.long,
      };
    },
    vbatt() {
      return this.currentData.uplink_message.decoded_payload.vbatt;
    },
  },
  name: "app",
  components: {
    PetsMap,
  },
  mounted() {
    this.$db
      .collection("history")
      .orderBy("received_at", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        const doc = snapshot.docs[0];
        this.$store.commit("setCurrentData", doc.data());
        var cur_timestamp = new Date().getTime();
        if (
          cur_timestamp - new Date(doc.data().received_at).getTime() <
          1000 * 60 * 10
        )
          this.$store.commit("setOnline");

        this.$store.commit(
          "setLastOnlineTime",
          new Date(doc.data().received_at)
        );
        let timeout = () => {
          this.$store.commit("setOffline");
          this.timer = setTimeout(timeout, 10000 * 60);
        };
        clearTimeout(this.timer);
        this.timer = setTimeout(timeout, 10000 * 60);
        //this.current_data = doc.data();
        console.log("Current data: ", doc.data());
      });
  },
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
#info {
  flex: 0 1 auto;
  padding: 0;
}
#pets-map {
  flex: 1 1 auto;
}
.badge {
  display: inline;
  margin: 0 5px;
}
</style>
