"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Oscillator extends types_1.AudioComponent {
    constructor(ctx) {
        super(ctx);
        this._mute = false;
        this._wave = 'sine';
        this._detune = 0;
        this._freq = 440;
        this.osc = ctx.createOscillator();
        this.gain = ctx.createGain();
        this.osc.connect(this.gain);
        this.entry.connect(this.gain);
        this.gain.connect(this.exit);
        this.semi = 0;
        this.osc.start(ctx.currentTime);
    }
    set mute(val) {
        this.volume = 0;
    }
    get mute() {
        return this._mute;
    }
    set volume(val) {
        this.gain.gain.setValueAtTime(val, this.gain.context.currentTime);
    }
    get volume() {
        return this.gain.gain.value;
    }
    set wave(wave) {
        this.osc.type = wave;
    }
    get wave() {
        return this._wave;
    }
    set detune(val) {
        this.osc.detune.setValueAtTime(val, this.gain.context.currentTime);
        this._detune = this.osc.detune.value;
    }
    get detune() {
        return this._detune;
    }
    set frequency(val) {
        this.osc.frequency.setValueAtTime(val, this.osc.context.currentTime);
        this._freq = val;
    }
}
exports.default = Oscillator;
//# sourceMappingURL=function_generator.js.map