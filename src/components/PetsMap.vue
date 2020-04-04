<template>
  <GmapMap  :center="position" :zoom="15" map-type-id="terrain">
    <GmapMarker
      :position="position"
      :clickable="true"
      :draggable="true"
      label="Роджер"
      @click="center=position"
      title="Rodger"
    />
  </GmapMap>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      timer: null
    };
  },
  computed: {
    ...mapState({
      currentData: state => state.currentData
    }),
    position() {
      return {
        lat: this.currentData.payload_fields.lat,
        lng: this.currentData.payload_fields.long
      };
    }
  },
  name: "PetsMap",
  props: {
    msg: String
  },
  mounted() {
    this.$db
      .collection("last_data")
      .doc("first")
      .onSnapshot(doc => {
        this.$store.commit("setCurrentData", doc.data());
        var cur_timestamp = new Date().getTime();
        if (
          cur_timestamp - new Date(doc.data().metadata.time).getTime() <
          1000 * 60 * 10
        )
          this.$store.commit("setOnline");

        this.$store.commit("setLastOnlineTime",new Date(doc.data().metadata.time));
        let timeout = () => {
          this.$store.commit("setOffline");
          this.timer = setTimeout(timeout, 10000 * 60);
        };
        clearTimeout(this.timer);
        this.timer = setTimeout(timeout, 10000 * 60);
        //this.current_data = doc.data();
        console.log("Current data: ", doc.data());
      });
  }
};
</script>

<style scoped>

</style>
