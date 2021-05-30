"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const adsr_1 = tslib_1.__importDefault(require("./adsr"));
const function_generator_1 = tslib_1.__importDefault(require("./function_generator"));
const volume_1 = tslib_1.__importDefault(require("./volume"));
const midi = Array(127);
const a = 440; // a is 440 hz...
for (let x = 0; x < 127; x++) {
    midi[x] = (a / 32) * 2 ** ((x - 9) / 12);
}
const defaultConfig = {
    osc1: {
        wave: 'sine',
        amp: 0.75,
        semi: 0,
    },
    osc2: {
        wave: 'sine',
        amp: 0.5,
        semi: 3,
    },
    osc3: {
        wave: 'sine',
        amp: 0.3,
        semi: 5,
        mute: true,
    },
    envelope: {
        a: 1,
        at: 200,
        dt: 200,
        s: 0.5,
        rt: 400,
    },
    master: 0.75,
};
class ThreeOscSynth {
    constructor(context, config) {
        this.config = config || defaultConfig;
        this.context = context || new AudioContext();
        this.master = new volume_1.default(this.context);
        this.master.output.connect(this.context.destination);
        this.envelope = new adsr_1.default(this.context);
        this.envelope.output.connect(this.master.input);
        this.osc1 = new function_generator_1.default(this.context);
        this.osc1.output.connect(this.envelope.input);
        this.osc2 = new function_generator_1.default(this.context);
        this.osc2.output.connect(this.envelope.input);
        this.osc3 = new function_generator_1.default(this.context);
        this.osc3.output.connect(this.envelope.input);
    }
    /**
     * Play note
     *
     * @param {number} midiNote - 0 - 125 MIDI Note
     * @memberof ThreeOscSynth
     */
    noteDown(midiNote) {
        var _a;
        const now = ((_a = this.context) === null || _a === void 0 ? void 0 : _a.currentTime) || 0;
        this.osc1.frequency = midi[this.osc1.semi + midiNote];
        this.osc2.frequency = midi[this.osc2.semi + midiNote];
        this.osc3.frequency = midi[this.osc3.semi + midiNote];
        this.envelope.open();
    }
    /**
     * Stop note
     *
     * @memberof ThreeOscSynth
     */
    noteUp() {
        this.envelope.close();
    }
}
exports.default = ThreeOscSynth;
//# sourceMappingURL=index.js.map