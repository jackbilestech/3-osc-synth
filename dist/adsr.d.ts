import { AudioComponent } from "./types";
export declare const attack: (node: GainNode, a: number, at: number, dt: number, s: number) => void;
export declare const release: (node: GainNode, t: number) => void;
export default class Envelope extends AudioComponent {
    protected readonly amp: GainNode;
    private attack;
    get A(): {
        amp?: number;
        time?: number;
    };
    set A(val: {
        amp?: number;
        time?: number;
    });
    private decay;
    get D(): number;
    set D(val: number);
    private sustain;
    get S(): number;
    set S(val: number);
    private release;
    get R(): number;
    set R(val: number);
    constructor(ctx: AudioContext);
    open(): void;
    close(): void;
}
//# sourceMappingURL=adsr.d.ts.map