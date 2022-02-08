<template>
  <v-container>
    <v-row no-gutters class="flex-nowrap" justify="space-around">
      <v-col shaped v-for="(k, index) in notes" :key="index">
        <v-btn
          height="100px"
          block
          :class="{ sharp: [1, 4, 6, 9, 11].includes((k - 21) % 12) }"
          :color="[1, 4, 6, 9, 11].includes((k - 21) % 12) ? 'black' : null"
          @mousedown="
            () => {
              playNote(k);
            }
          "
          @mouseup="
            () => {
              stopPlaying();
            }
          "
        >
          {{ (k - 21) % 12 }} {{ k }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import synthStore from "@/store/synth.store";

const STARTING_NOTE = 69 - 12;
const ENDING_NOTE = STARTING_NOTE + 13;

@Component
export default class Keyboard extends Vue {
  useQwerty = false;
  notes = Array(ENDING_NOTE - STARTING_NOTE)
    .fill(false)
    .map((_, idx) => {
      return STARTING_NOTE + idx;
    });
  synth = synthStore.synth;

  mounted() {

  }
  beforeDestroyed() {
    document.addEventListener("keydown", () => {});
    document.addEventListener("keyup", () => {});
  }

  playNote(note: number) {
    this.synth?.noteDown(note);
  }

  stopPlaying() {
    this.synth?.noteUp();
  }
}
</script>
<style scoped>
.container {
  display: flex; /* or inline-flex */
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
}
.key {
  border-style: solid;
}
.key > div {
  background: white;
  height: 100%;
}
.sharp {
  color: white;
}
</style>