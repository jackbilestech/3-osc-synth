import { AudioComponent } from "./types"
export type TENV = {
  /**
   * Attack amplitude 
   * 
   * The amplitude the signal rises to on activation
   * 
   * @type {number}
   */
  a: number
  /**
   * Attack time
   * 
   * The time it takes from the signal to reach the designated amplitude
   *
   * @type {number}
   */
  at: number
  /**
   * Decay time
   * 
   * The time it takes to decay from the initial attack
   *
   * @type {number}
   */
  dt: number
  /**
   *  Sustain amplitude
   * 
   *  As the note is held, this is the notes amplitude
   *
   * @type {number}
   */
  s: number
  /**
   * Release time
   * 
   * The time it takes for the sound to reach 0
   *
   * @type {number}
   */
  rt: number
}

export default class Master extends AudioComponent {
  protected gain: GainNode
  private _mute: boolean = false
  set mute(val: boolean) {
    this._mute = val
    this.volume = 0
  }
  get mute() {
    return this._mute
  }

  private _volume: number = 0.75
  set volume(val: number) {
    this.gain.gain.setValueAtTime(this.volume, this.gain.context.currentTime)
    this._volume = val
  }

  get volume() {
    return this._volume
  }

  constructor(ctx: AudioContext) {
    super(ctx)

    this.gain = ctx.createGain()
    this.entry.connect(this.gain)
    this.gain.connect(this.exit)
    this.mute = true
  }
}