<template>
  <v-card v-if="osc" outlined shaped>
    <v-card-title>OSC {{ num }} </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            Volume
            <KnobControl
              v-model="osc.volume"
              :min="0"
              :max="1"
              :stepSize="0.01"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
            ></KnobControl>
          </v-col>
          <v-col>
            Detune
            <KnobControl
              v-model="osc.detune"
              :min="-100"
              :max="100"
              :stepSize="1"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
            ></KnobControl>
          </v-col>

          <v-col>
            <v-btn
              :color="osc.mute ? 'accent' : null"
              @click="(evt) => (osc.mute = !osc.mute)"
            >
              {{ osc.mute ? "MUTED" : "ON" }}
            </v-btn>
          </v-col>

          <v-col>
            <v-select
              v-model="osc.wave"
              :items="['square', 'triangle', 'sine']"
              @change="(evt) => {osc.wave = evt}"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import synthStore from "@/store/synth.store";
import { Prop } from "vue-property-decorator";
import KnobControl from "vue-knob-control";

@Component({
  components: {
    KnobControl,
  },
})
export default class App extends Vue {
  @Prop(Number) readonly num!: number | undefined;

  synth = synthStore.synth;
  osc = synthStore.synth?.osc1;

  mounted(): void {
    switch (this.num) {
      case 1:
      default:
        this.osc = this.synth?.osc1;
        break;
      case 2:
        this.osc = this.synth?.osc2;
        break;
      case 3:
        this.osc = this.synth?.osc3;
        break;
    }
  }
}
</script>

<style scoped>

</style>