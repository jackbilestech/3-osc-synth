import { AudioComponent } from "./types"

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

export default class Envelope extends AudioComponent {
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
    return this.sustain
  }

  set R(val: number) {
    this.release = val
  }
  constructor(ctx: AudioContext) {
    super(ctx)
    this.amp = ctx.createGain()
    this.amp.gain.value = 0
    this.entry.connect(this.amp)
    this.amp.connect(this.exit)
    this.attack = { amp: 0.75, time: 500 }
    this.decay = 500
    this.sustain = 0.3
    this.release = 500
  }

  open() {
    console.log('attacking');
    
    attack(
      this.amp,
      this.attack.amp,
      this.attack.time,
      this.decay,
      this.sustain
    )
  }
  close() {
    release(this.amp, this.release)
  }
}