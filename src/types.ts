class Chainable {
  /**
   * The entry point of the node
   * 
   * Used to plug into other Web Audio nodes
   *
   * @protected
   * @memberof Chainable
   */
  protected readonly entry
  /**
   * The exit point of the node
   * 
   * Used to plug into other Web Audio nodes
   *
   * @protected
   * @memberof Chainable
   */
  protected readonly exit

  constructor(ctx: AudioContext) {
    this.entry = ctx.createDelay()
    this.exit = ctx.createDelay()
  }
}

export class AudioComponent extends Chainable {
  /**
   * The input of the Audio Component
   * Can be used to plugin into other Web Audio Nodes
   * @type {AudioNode}
   * @memberof AudioComponent
   */
  readonly input: AudioNode
  /**
   * The output of the Audio Component
   * Can be used to plugin into other Web Audio Nodes
   * @type {AudioNode}
   * @memberof AudioComponent
   */
  readonly output: AudioNode

  constructor(ctx: AudioContext) {
    super(ctx)
    this.input = ctx.createGain()
    this.output = ctx.createGain()
    this.bypass(false)
  }

  /**
   * True bypass the audio component
   *
   * @param {boolean} val
   * @memberof AudioComponent
   */
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