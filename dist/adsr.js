"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.release = exports.attack = void 0;
const types_1 = require("./types");
const attack = (node, a, at, dt, s) => {
    const now = node.context.currentTime;
    node.gain.setValueAtTime(0, now);
    node.gain.linearRampToValueAtTime(a, now + at / 1000);
    node.gain.linearRampToValueAtTime(s, now + at / 1000 + dt / 100);
};
exports.attack = attack;
const release = (node, t) => {
    const now = node.context.currentTime;
    node.gain.cancelAndHoldAtTime(now);
    node.gain.linearRampToValueAtTime(0, now + t / 1000);
};
exports.release = release;
class Envelope extends types_1.AudioComponent {
    constructor(ctx) {
        super(ctx);
        this.amp = ctx.createGain();
        this.amp.gain.value = 0;
        this.entry.connect(this.amp);
        this.amp.connect(this.exit);
        this.attack = { amp: 0.75, time: 500 };
        this.decay = 500;
        this.sustain = 0.3;
        this.release = 500;
    }
    get A() {
        return this.attack;
    }
    set A(val) {
        this.attack.amp = val.amp || this.attack.amp;
        this.attack.time = val.time || this.attack.time;
    }
    get D() {
        return this.decay;
    }
    set D(val) {
        this.decay = val;
    }
    get S() {
        return this.sustain;
    }
    set S(val) {
        this.sustain = val;
    }
    get R() {
        return this.sustain;
    }
    set R(val) {
        this.release = val;
    }
    open() {
        console.log('attacking');
        exports.attack(this.amp, this.attack.amp, this.attack.time, this.decay, this.sustain);
    }
    close() {
        exports.release(this.amp, this.release);
    }
}
exports.default = Envelope;
//# sourceMappingURL=adsr.js.map