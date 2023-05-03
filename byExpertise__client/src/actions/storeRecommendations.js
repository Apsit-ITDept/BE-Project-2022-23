import { makeAutoObservable } from "mobx";

class Store {
  dataToSend = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDataToSend(dataToSend) {
    this.dataToSend = dataToSend;
  }
}

export default new Store();
