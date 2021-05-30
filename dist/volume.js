"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Master extends types_1.AudioComponent {
    constructor(ctx) {
        super(ctx);
        this._mute = false;
        this._volume = 0.75;
        this.gain = ctx.createGain();
        this.entry.connect(this.gain);
        this.gain.connect(this.exit);
        this.mute = true;
    }
    set mute(val) {
        this._mute = val;
        this.volume = 0;
    }
    get mute() {
        return this._mute;
    }
    set volume(val) {
        this.gain.gain.setValueAtTime(this.volume, this.gain.context.currentTime);
        this._volume = val;
    }
    get volume() {
        return this._volume;
    }
}
exports.default = Master;
//# sourceMappingURL=volume.js.map