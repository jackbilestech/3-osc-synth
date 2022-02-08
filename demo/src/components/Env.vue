<template>
  <v-card v-if="env" shaped outlined>
    <v-card-title>ENVELOPE</v-card-title>
    <v-card-text>
      <v-container>
        <v-row justify="center">
          <v-col>
            Attack Time
            <KnobControl
              v-model="env.A.time"
              :stepSize="1"
              :min="1"
              :max="5000"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
              :size="75"
            ></KnobControl>
          </v-col>
          <v-col>
            Attack Amplitude
            <KnobControl
              v-model="env.A.amp"
              :stepSize="0.01"
              :min="0"
              :max="1"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
              :size="75"
            ></KnobControl>
          </v-col>
          <v-col>
            Decay Time
            <KnobControl
              v-model="env.D"
              :stepSize="1"
              :min="1"
              :max="3000"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
              :size="75"
            ></KnobControl>
          </v-col>
          <v-col>
            Sustain Amplitude
            <KnobControl
              v-model="env.S"
              :stepSize="0.01"
              :min="0"
              :max="1"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
              :size="75"
            ></KnobControl>
          </v-col>
          <v-col>
            Relase Time
            <KnobControl
              v-model="env.R"
              :stepSize="1"
              :min="1"
              :max="5000"
              :valueDisplayFunction="(v) => Math.round(v * 100) / 100"
              :responsive="true"
              :size="75"
            ></KnobControl>
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
import KnobControl from "vue-knob-control";

@Component({
  components: {
    KnobControl,
  },
})
export default class App extends Vue {
  synth = synthStore.synth;
  env = synthStore.synth?.envelope;

  mounted(): void {}
}
</script>