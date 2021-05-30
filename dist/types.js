"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioComponent = void 0;
class Chainable {
    constructor(ctx) {
        this.entry = ctx.createDelay();
        this.exit = ctx.createDelay();
    }
}
class AudioComponent extends Chainable {
    constructor(ctx) {
        super(ctx);
        this.input = ctx.createGain();
        this.output = ctx.createGain();
        this.bypass(false);
    }
    bypass(val) {
        this.input.disconnect();
        if (val) {
            this.input.connect(this.output);
        }
        else {
            this.input.connect(this.entry);
            this.exit.connect(this.output);
        }
    }
}
exports.AudioComponent = AudioComponent;
//# sourceMappingURL=types.js.map