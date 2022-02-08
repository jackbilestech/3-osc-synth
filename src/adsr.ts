import { AudioComponent } from "./types"

export type EnvelopeConfig = {
  /**
   * Sets the maximum amplitude and the time it takes for the signal to rise to this value.
   *
   * @type {{ amp: number, time: number }}
   */
  A?: { amp?: number, time?: number }
  /**
   * Decay time
   * 
   * The time it takes to decay from the initial attack
   *
   * @type {number}
   */
  D?: number
  /**
   *  Sustain amplitude
   * 
   *  As the note is held, this is the notes amplitude
   *
   * @type {number}
   */
  S?: number
  /**
   * Release time
   * 
   * The time it takes for the sound to reach 0
   *
   * @type {number}
   */
  R?: number
}

export const attack = (
  node: GainNode,
  a: number,
  at: number,
  dt: number,
  s: number
) => {
  const now = node.context.currentTime
  node.gain.setValueAtTime(0, now)
  node.gain.linearRampToValueAtTime(a, now + at / 1000)
  node.gain.linearRampToValueAtTime(s, now + at / 1000 + dt / 100)
}

export const release = (node: GainNode, t: number) => {
  const now = node.context.currentTime
  node.gain.cancelAndHoldAtTime(now)
  node.gain.linearRampToValueAtTime(0, now + t / 1000)
}

export default class Envelope extends AudioComponent implements EnvelopeConfig {
  protected readonly amp: GainNode
  private attack: { amp: number, time: number }
  get A() {
    return this.attack
  }
  set A(val: { amp?: number, time?: number }) {
    this.attack.amp = val.amp || this.attack.amp
    this.attack.time = val.time || this.attack.time
  }

  private decay: number
  get D() {
    return this.decay
  }

  set D(val: number) {
    this.decay = val
  }

  private sustain: number
  get S() {
    return this.sustain
  }

  set S(val: number) {
    this.sustain = val
  }

  private release: number
  get R() {
    return this.release
  }

  set R(val: number) {
    this.release = val
  }
  constructor(ctx: AudioContext, config?: EnvelopeConfig) {
    super(ctx)
    this.amp = ctx.createGain()
    this.amp.gain.value = 0
    this.entry.connect(this.amp)
    this.amp.connect(this.exit)
    this.attack = { amp: config?.A?.amp || 0.75, time: config?.A?.time || 500 }
    this.decay = config?.D || 500
    this.sustain = config?.S || 0.3
    this.release = config?.R || 500
  }

  /**
   * Open the envelope
   *
   * @memberof Envelope
   */
  open() {
    attack(
      this.amp,
      this.attack.amp,
      this.attack.time,
      this.decay,
      this.sustain
    )
  }
  /**
   * Close the envelope
   *
   * @memberof Envelope
   */
  close() {
    release(this.amp, this.release)
  }
}