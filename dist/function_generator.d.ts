import { AudioComponent } from "./types";
export declare type TWave = 'sine' | 'triangle' | 'square';
export declare type TOSC = {
    /**
     * The function generators desired waveform
     *
     * @type {('sine' | 'triangle' | 'square')}
     */
    wave: TWave;
    /**
     *  Amplitude of the oscillator
     *
     * @type {number}
     */
    amp: number;
    /**
     * Semi-tones away from the root
     *
     * @type {number}
     */
    semi: number;
    /**
     * Mutes the oscillator
     *
     * @type {boolean}
     */
    mute?: boolean;
};
export default class Oscillator extends AudioComponent {
    protected readonly osc: OscillatorNode;
    protected readonly gain: GainNode;
    semi: number;
    private _mute;
    set mute(val: boolean);
    get mute(): boolean;
    set volume(val: number);
    get volume(): number;
    private _wave;
    set wave(wave: TWave);
    get wave(): TWave;
    private _detune;
    set detune(val: number);
    get detune(): number;
    private _freq;
    set frequency(val: number);
    constructor(ctx: AudioContext);
}
//# sourceMappingURL=function_generator.d.ts.map