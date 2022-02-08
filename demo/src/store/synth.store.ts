// user-module.ts
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "./";
import Synth, { defaultConfig } from "../../../src";

@Module
class SynthModule extends VuexModule {
  // state
  synth: Synth | null = null

  @Mutation
  private __init() {
    this.synth = new Synth(defaultConfig)
  }

  @Action
  async init() {
    this.__init()
  }
}

// register module (could be in any file)
export default new SynthModule({ store, name: "synth" });