import { makeAutoObservable } from "mobx";

class Store {
  modelOutput = null;

  constructor() {
    makeAutoObservable(this);
  }

  setModelOutput(modelOutput) {
    this.modelOutput = modelOutput;
  }
}

export default new Store();
