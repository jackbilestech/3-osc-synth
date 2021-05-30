<template>
  <div id="app" v-if="synth">
    <button @click.prevent="play">Play</button>
    <div id="osc1">
      <label>
        Volume
        <input
          v-model="synth.master.volume"
          type="range"
          min="0"
          max="0.75"
          step="0.01"
          @change="evt => (synth.master.volume = evt.target.value)"
        />
      </label>
      <label>
        Detune
        <input
          v-model="synth.osc1.detune"
          type="range"
          min="-100"
          max="100"
          step="1"
          @change="evt => (synth.osc1.detune = evt.target.value)"
        />
      </label>
      <label>
        Wave
        <select
          v-model="synth.osc1.wave"
          @change="evt => (synth.osc1.wave = evt.target.value)"
        >
          <option value="square">Harsh</option>
          <option value="triangle">Three Sided</option>
          <option value="sine">Pure</option>
        </select>
      </label>
    </div>
    <div id="osc2"></div>
    <div id="osc3"></div>
    <div id="amp"></div>
    <div id="master"></div>
  </div>
  <div v-else>
    <button @click.prevent="press">Load Instance</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Synth from "../../src";

@Component
export default class App extends Vue {
  synth: Synth | null = null;
  mounted(): void {}
  press(): void {
    var ctx = new AudioContext();
    this.synth = new Synth(ctx);
  }

  play() {
    this.synth?.noteDown(60);
    setTimeout(() => {
      this.synth?.noteUp();
    }, 1000);
  }
}
</script>