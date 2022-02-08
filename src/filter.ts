import { AudioComponent } from "./types";

export type FilterConfig = {
  /**
   * Filter Q
   *
   * @type {number}
   */
  q: number
  /**
   * Cutoff frequency
   *
   * @type {number}
   */
  frequency: number
  /**
   * The type of filter to use
   *
   * @type {BiquadFilterType}
   */
  type: BiquadFilterType
}

export class Filter extends AudioComponent implements FilterConfig {
  protected readonly f: BiquadFilterNode
  
  private _type: BiquadFilterType = 'lowpass'
  set type(val: BiquadFilterType){
    this.f.type = val
    this._type = val
  }
  get type(){
    return this._type
  }

  private _frequency: number = 10
  set frequency(val: number){
    this.f.frequency.setValueAtTime(val, this.f.context.currentTime)
    this._frequency = val
  }
  get frequency(){
    return this._frequency
  }

  private _q: number = 0.01
  set q(val: number){
    this.f.Q.setValueAtTime(val, this.f.context.currentTime)
    this._q = val
  }
  get q(){
    return this._q
  }

  constructor(ctx: AudioContext, config?: FilterConfig) {
    super(ctx)
    this.f = ctx.createBiquadFilter()
    this.entry.connect(this.f)
    this.f.connect(this.exit)

    this.f.Q.value = config?.q || 1
    this.f.frequency.value = config?.frequency || 100
    this.f.type = config?.type || 'lowpass'
  }
} 