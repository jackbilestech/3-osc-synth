import Envelope, { attack, release } from './adsr'
import Oscillator from './function_generator'
import { IAmp, IConfig, IMaster, IOsc, ISynth } from './types'
import Master from './volume'

const midi = Array(127)
const a = 440 // a is 440 hz...
for (let x = 0; x < 127; x++) {
  midi[x] = (a / 32) * 2 ** ((x - 9) / 12)
}

const defaultConfig: IConfig = {
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
}


class ThreeOscSynth { // implements ISynth {
  config: IConfig
  context: AudioContext

  master: Master

  envelope: Envelope

  osc1: Oscillator
  osc2: Oscillator
  osc3: Oscillator

  constructor(context?: AudioContext, config?: IConfig) {

    this.config = config || defaultConfig
    this.context = context || new AudioContext()

    this.master = new Master(this.context)
    this.master.output.connect(this.context.destination)

    this.envelope = new Envelope(this.context)
    this.envelope.output.connect(this.master.input)

    this.osc1 = new Oscillator(this.context)
    this.osc1.output.connect(this.envelope.input)

    this.osc2 = new Oscillator(this.context)
    this.osc2.output.connect(this.envelope.input)

    this.osc3 = new Oscillator(this.context)
    this.osc3.output.connect(this.envelope.input)
  }
  /**
   * Play note
   *
   * @param {number} midiNote - 0 - 125 MIDI Note
   * @memberof ThreeOscSynth
   */
  noteDown(midiNote: number) {
    const now = this.context?.currentTime || 0
    this.osc1.frequency = midi[this.osc1.semi + midiNote]
    this.osc2.frequency = midi[this.osc2.semi + midiNote]
    this.osc3.frequency = midi[this.osc3.semi + midiNote]
    this.envelope.open()
  }

  /**
   * Stop note
   *
   * @memberof ThreeOscSynth
   */
  noteUp() {
    this.envelope.close()
  }
}

export default ThreeOscSynth