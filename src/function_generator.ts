import { AudioComponent } from "./types"
export type TWave = 'sine' | 'triangle' | 'square'

export type OscillatorConfig = {
  /**
   * The function generators desired waveform
   *
   * @type {('sine' | 'triangle' | 'square')}
   */
  wave?: TWave
  /**
   *  Amplitude of the oscillator
   *
   * @type {number}
   */
  volume?: number
  /**
   * Semi-tones away from the root
   *
   * @type {number}
   */
  semi?: number
  /**
   * Mutes the oscillator
   *
   * @type {boolean}
   */
  mute?: boolean
  /**
   * Detune the oscillator
   *
   * @type {number}
   */
  detune?: number
}

export default class Oscillator extends AudioComponent implements OscillatorConfig {
  protected readonly osc: OscillatorNode
  protected readonly gain: GainNode
  semi: number
  private _mute: boolean = false
  set mute(val: boolean) {
    this.volume = 0
    this._mute = val
  }
  get mute() {
    return this._mute
  }

  set volume(val: number) {
    this.gain.gain.setValueAtTime(val, this.gain.context.currentTime)
    this._volume = this.gain.gain.value
  }

  private _volume: number = 0.5
  get volume() {
    return this._volume
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
  /**
   * Set the frequency of the oscialltor
   *
   * @memberof Oscillator
   */
  set frequency(val: number) {
    this.osc.frequency.setValueAtTime(val, this.osc.context.currentTime)
    this._freq = val
  }

  get frequency() {
    return this._freq
  }

  constructor(ctx: AudioContext, config?: OscillatorConfig) {
    super(ctx)
    this.osc = ctx.createOscillator()
    this.gain = ctx.createGain()
    this.semi = 0
    this.gain.gain.value = config?.volume || 0.75
    this.mute = !!config?.mute
    this.osc.type = config?.wave || 'sine'

    this.osc.connect(this.gain)
    this.entry.connect(this.gain)
    this.gain.connect(this.exit)
    this.osc.start(ctx.currentTime)
  }
}
