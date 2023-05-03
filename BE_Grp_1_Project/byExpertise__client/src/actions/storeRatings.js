import { makeAutoObservable } from "mobx";

class Store {
  modelOutput2 = null;

  constructor() {
    makeAutoObservable(this);
  }

  setModelOutput2(modelOutput2) {
    this.modelOutput2 = modelOutput2;
  }
}

export default new Store();
