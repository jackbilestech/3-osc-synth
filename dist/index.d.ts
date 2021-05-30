import Envelope from './adsr';
import Oscillator from './function_generator';
import { IConfig } from './types';
import Master from './volume';
declare class ThreeOscSynth {
    config: IConfig;
    context: AudioContext;
    master: Master;
    envelope: Envelope;
    osc1: Oscillator;
    osc2: Oscillator;
    osc3: Oscillator;
    constructor(context?: AudioContext, config?: IConfig);
    /**
     * Play note
     *
     * @param {number} midiNote - 0 - 125 MIDI Note
     * @memberof ThreeOscSynth
     */
    noteDown(midiNote: number): void;
    /**
     * Stop note
     *
     * @memberof ThreeOscSynth
     */
    noteUp(): void;
}
export default ThreeOscSynth;
//# sourceMappingURL=index.d.ts.map