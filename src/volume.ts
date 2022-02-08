import { AudioComponent } from "./types"


export type MasterConfig = {
  volume?: number
  mute?: boolean
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
    this.gain.gain.setValueAtTime(val, this.gain.context.currentTime)
    console.log('Setting volume');

    this._volume = val
  }

  get volume() {
    return this._volume
  }

  constructor(ctx: AudioContext, config?: MasterConfig) {
    super(ctx)

    this.gain = ctx.createGain()
    this.entry.connect(this.gain)
    this.gain.connect(this.exit)
    this.mute = !!config?.mute
    this.volume = config?.volume || 0.75
  }
}