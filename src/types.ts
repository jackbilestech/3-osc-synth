import { TOSC, TWave } from "./function_generator"
import { TENV } from "./volume"

class Chainable {
  protected readonly entry
  protected readonly exit

  constructor(ctx: AudioContext) {
    this.entry = ctx.createDelay()
    this.exit = ctx.createDelay()
  }
}

export class AudioComponent extends Chainable {
  readonly input: AudioNode
  readonly output: AudioNode

  constructor(ctx: AudioContext) {
    super(ctx)
    this.input = ctx.createGain()
    this.output = ctx.createGain()
    this.bypass(false)
  }

  public bypass(val: boolean) {
    this.input.disconnect()
    if (val) {
      this.input.connect(this.output)
    }
    else {
      this.input.connect(this.entry)
      this.exit.connect(this.output)
    }
  }
}

export interface IConfig {
  osc1: TOSC
  osc2: TOSC
  osc3: TOSC
  envelope: TENV
  /**
   * Master volume
   */
  master: number
}

export interface IMaster {
  volume: number
  mute: boolean
}

export interface IAmp {
  A: { amp?: number, time?: number }
  D: number
  S: number
  R: number
}

export interface IOsc {
  detune: number
  mute: boolean
  volume: number
  wave: TWave
}

export interface ISynth {
  noteDown(midiNote: number): void
  noteUp(): void
  master: IMaster
  envelope: IAmp
  osc1: IOsc
  osc2: IOsc
  osc3: IOsc
}