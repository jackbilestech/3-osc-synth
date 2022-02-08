<template>
  <v-card outlined shaped>
    <v-card-title>FILTER</v-card-title>
    <v-card-text>
      <v-container >
        <v-row>
          <v-col>
            <v-select
              v-model="synth.filter.type"
              :items="[
                'allpass',
                'lowpass',
                'highpass',
                'bandpass',
                'lowshelf',
                'highshelf',
                'peaking',
                'notch',
              ]"
              @change="
                (evt) => {
                  synth.filter.type = evt;
                }
              "
            >
            </v-select>
          </v-col>
          <v-col>
            Frequency
            <KnobControl
              v-model="synth.filter.frequency"
              :min="10"
              :max="2000"
              :stepSize="1"
              :responsive="true"
            >
            </KnobControl>
          </v-col>
          <v-col>
            Q
            <KnobControl
              v-model="synth.filter.q"
              :min="0"
              :max="1"
              :stepSize="0.01"
              :responsive="true"
            >
            </KnobControl>
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
export default class VCFILTER extends Vue {
  synth = synthStore.synth;
}
</script>