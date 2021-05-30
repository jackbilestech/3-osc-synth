import { AudioComponent } from "./types"
export type TWave = 'sine' | 'triangle' | 'square'

export type TOSC = {
  /**
   * The function generators desired waveform
   *
   * @type {('sine' | 'triangle' | 'square')}
   */
  wave: TWave
  /**
   *  Amplitude of the oscillator
   *
   * @type {number}
   */
  amp: number
  /**
   * Semi-tones away from the root
   *
   * @type {number}
   */
  semi: number
  /**
   * Mutes the oscillator
   *
   * @type {boolean}
   */
  mute?: boolean
}

export default class Oscillator extends AudioComponent {
  protected readonly osc: OscillatorNode
  protected readonly gain: GainNode
  semi: number
  private _mute: boolean = false
  set mute(val: boolean) {
    this.volume = 0
  }
  get mute() {
    return this._mute
  }

  set volume(val: number) {
    this.gain.gain.setValueAtTime(val, this.gain.context.currentTime)
  }
  get volume() {
    return this.gain.gain.value
  }

  private _wave: TWave = 'sine'
  set wave(wave: TWave) {
    this.osc.type = wave
  }
  get wave() {
    return this._wave
  }

  private _detune = 0
  set detune(val: number) {
    this.osc.detune.setValueAtTime(val, this.gain.context.currentTime)
    this._detune = this.osc.detune.value
  }
  get detune() {
    return this._detune
  }

  private _freq: number = 440
  set frequency(val: number) {
    this.osc.frequency.setValueAtTime(val, this.osc.context.currentTime)
    this._freq = val
  }
  constructor(ctx: AudioContext) {
    super(ctx)
    this.osc = ctx.createOscillator()
    this.gain = ctx.createGain()
    this.osc.connect(this.gain)
    this.entry.connect(this.gain)
    this.gain.connect(this.exit)
    this.semi = 0
    this.osc.start(ctx.currentTime)
  }
}
