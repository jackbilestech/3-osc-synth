import { TOSC, TWave } from "./function_generator";
import { TENV } from "./volume";
declare class Chainable {
    protected readonly entry: DelayNode;
    protected readonly exit: DelayNode;
    constructor(ctx: AudioContext);
}
export declare class AudioComponent extends Chainable {
    readonly input: AudioNode;
    readonly output: AudioNode;
    constructor(ctx: AudioContext);
    bypass(val: boolean): void;
}
export interface IConfig {
    osc1: TOSC;
    osc2: TOSC;
    osc3: TOSC;
    envelope: TENV;
    /**
     * Master volume
     */
    master: number;
}
export interface IMaster {
    volume: number;
    mute: boolean;
}
export interface IAmp {
    A: {
        amp?: number;
        time?: number;
    };
    D: number;
    S: number;
    R: number;
}
export interface IOsc {
    detune: number;
    mute: boolean;
    volume: number;
    wave: TWave;
}
export interface ISynth {
    noteDown(midiNote: number): void;
    noteUp(): void;
}
export {};
//# sourceMappingURL=types.d.ts.map