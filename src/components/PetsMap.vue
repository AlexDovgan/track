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
        lat: this.currentData.uplink_message.decoded_payload.lat,
        lng: this.currentData.uplink_message.decoded_payload.long
      };
    }
  },
  name: "PetsMap",
  props: {
    msg: String
  },
  mounted() {
  }
};
</script>

<style scoped>

</style>
