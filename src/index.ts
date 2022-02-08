import Envelope, { attack, EnvelopeConfig, release } from './adsr'
import { Filter, FilterConfig } from './filter'
import Oscillator, { OscillatorConfig } from './function_generator'
import Master, { MasterConfig } from './volume'

const midi = Array(127)
const a = 440 // a is 440 hz...
for (let x = 0; x < 127; x++) {
  midi[x] = (a / 32) * 2 ** ((x - 9) / 12)
}

export type DefaultConfig = {
  osc1?: OscillatorConfig,
  osc2?: OscillatorConfig,
  osc3?: OscillatorConfig,
  env?: EnvelopeConfig,
  filter?: FilterConfig
  master?: MasterConfig
}

export const defaultConfig: DefaultConfig = {
  osc1: {
    wave: 'sine',
    volume: 0.75,
    semi: 0,
  },
  osc2: {
    wave: 'triangle',
    volume: 0.5,
    semi: 3,
  },
  osc3: {
    wave: 'square',
    volume: 0.3,
    semi: 5,
    mute: true,
  },
  env: {
    A: {
      amp: 0.25,
      time: 1000
    },
    D: 200,
    S: 0.5,
    R: 400,
  },
  master: {
    volume: 0.25
  },
}


class ThreeOscSynth {
  readonly config: DefaultConfig
  readonly context: AudioContext

  master: Master

  envelope: Envelope

  osc1: Oscillator
  osc2: Oscillator
  osc3: Oscillator

  filter: Filter
  constructor(config?: DefaultConfig)
  constructor(config?: DefaultConfig, context?: AudioContext) {

    this.config = config || defaultConfig
    this.context = context || new AudioContext()

    this.master = new Master(this.context, config?.master)
    this.master.output.connect(this.context.destination)

    this.envelope = new Envelope(this.context, config?.env)

    this.osc1 = new Oscillator(this.context, config?.osc1)
    this.osc1.output.connect(this.envelope.input)

    this.osc2 = new Oscillator(this.context, config?.osc2)
    this.osc2.output.connect(this.envelope.input)

    this.osc3 = new Oscillator(this.context, config?.osc3)
    this.osc3.output.connect(this.envelope.input)

    this.filter = new Filter(this.context, config?.filter)
    this.envelope.output.connect(this.filter.input)

    this.filter.output.connect(this.master.input)
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

  /**
   *
   * @param {IConfig} config
   * @memberof ThreeOscSynth
   * @todo
   */
  loadPreset(config: DefaultConfig) {

  }
}

export default ThreeOscSynth