<template>
  <v-app>
    <v-main>
      <v-container v-if="!store.synth">
        <v-row>
          <v-col>
            <v-btn @click="init"> Load Instance </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else fill-height>
        <v-row>
          <v-col>
            <ENV></ENV>
          </v-col>
          <v-col cols="2">
            <v-card shaped outlined>
              <v-card-title>MASTER</v-card-title>
              <v-card-text>
                Volume
                <KnobControl
                  v-model="store.synth.master.volume"
                  :min="0"
                  :max="0.75"
                  :stepSize="0.01"
                  :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
                  :responsive="true"
                >
                </KnobControl>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SCOPE></SCOPE>
          </v-col>
          <v-col>
            <VCFILTER></VCFILTER>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <OSC :num="1"></OSC>
          </v-col>
          <v-col>
            <OSC :num="2"></OSC>
          </v-col>
          <v-col>
            <OSC :num="3"></OSC>
          </v-col>
        </v-row>
        <v-row>
          <KEYS></KEYS>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import synthStore from "@/store/synth.store";
import Component from "vue-class-component";
import OSC from "@/components/Osc.vue";
import ENV from "@/components/Env.vue";
import KEYS from "@/components/Keys.vue";
import SCOPE from "@/components/Oscilloscope.vue";
import VCFILTER from "@/components/Filter.vue";
import KnobControl from "vue-knob-control";

@Component({
  components: {
    OSC,
    ENV,
    KEYS,
    SCOPE,
    VCFILTER,
    KnobControl,
  },
})
export default class App extends Vue {
  store = synthStore;
  async init() {
    await synthStore.init();
  }
}
</script>