<template>
  <v-card shaped outlined>
    <v-card-title> SCOPE </v-card-title>
    <v-container>
      <v-row>
        <v-col>
            <canvas ref="canvas"></canvas>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Component from "vue-class-component";
import store from "@/store/synth.store";
import Vue from "vue";
import { Ref } from "vue-property-decorator";

@Component
export default class Oscilloscope extends Vue {
  store = store;
  @Ref() readonly canvas!: HTMLCanvasElement;
  anal?: AnalyserNode;

  mounted() {
    const audioCtx = store.synth?.context;

    if (!audioCtx) throw new Error("Not Ready");
    this.anal = audioCtx.createAnalyser();
    this.anal.fftSize = 256;
    store.synth?.master.output.connect(this.anal);

    this.draw();
  }

  draw() {
    const cvCtx = this.canvas.getContext("2d");
    if (!this.anal || !cvCtx) throw new Error("Not Ready");
    var bufferLength = this.anal?.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    this.anal.getByteTimeDomainData(dataArray);
    requestAnimationFrame(this.draw);

    this.anal.getByteTimeDomainData(dataArray);

    cvCtx.fillStyle = "#000";
    cvCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    cvCtx.lineWidth = 2;
    cvCtx.strokeStyle = "#FFF";

    cvCtx.beginPath();

    var sliceWidth = (this.canvas.width * 1.0) / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * this.canvas.height) / 2;

      if (i === 0) {
        cvCtx.moveTo(x, y);
      } else {
        cvCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    cvCtx.lineTo(this.canvas.width, this.canvas.height / 2);
    cvCtx.stroke();
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  max-height: 100px;
}
</style>