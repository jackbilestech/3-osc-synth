import { AudioComponent } from "./types";
export declare type TENV = {
    /**
     * Attack amplitude
     *
     * The amplitude the signal rises to on activation
     *
     * @type {number}
     */
    a: number;
    /**
     * Attack time
     *
     * The time it takes from the signal to reach the designated amplitude
     *
     * @type {number}
     */
    at: number;
    /**
     * Decay time
     *
     * The time it takes to decay from the initial attack
     *
     * @type {number}
     */
    dt: number;
    /**
     *  Sustain amplitude
     *
     *  As the note is held, this is the notes amplitude
     *
     * @type {number}
     */
    s: number;
    /**
     * Release time
     *
     * The time it takes for the sound to reach 0
     *
     * @type {number}
     */
    rt: number;
};
export default class Master extends AudioComponent {
    protected gain: GainNode;
    private _mute;
    set mute(val: boolean);
    get mute(): boolean;
    private _volume;
    set volume(val: number);
    get volume(): number;
    constructor(ctx: AudioContext);
}
//# sourceMappingURL=volume.d.ts.map