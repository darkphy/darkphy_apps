// @flow
import { action,observable } from 'npmmod/mobx';

class DarkErrorStore {

  @observable errorTitle = "";
  @observable errorDescription = "";
  @observable errorLabel = "";
  @observable errorActive = false;
  @observable errorIcon = false;
  @observable errorCode = -1;

  constructor({visibleClass="darkvisible", inVisibleClass="darkinvisible", rootClass="app-container"}) {
    //this.bindActions(DarkErrorActions);
    this.visibleClass = visibleClass;
    this.inVisibleClass = inVisibleClass;
    this.rootClass = rootClass;
  }
  @action setValue = (stores: Object) => {
    let self = this;
    for (let key in stores) {
        self[key] = stores[key];
    }
  }
  @action setErrorParams = (data = {}) => {
      this.setValue({
        errorTitle: data.title,
        errorDescription: data.description,
        errorLabel: (data.label) ? data.label : 'Close',
        errorIcon: (data.icon) ? data.icon : 'error_outline',
        errorActive: true
      });
      document.querySelector(`.${this.rootClass}`).classList.add(this.visibleClass);
  }
  @action activateError = (data) => {
    this.setValue({
      errorActive: true,
      errorCode: data.code
    });
    document.querySelector(`.${this.rootClass}`).classList.add(this.visibleClass);
  }
  deactivateError = () => {
    let self = this;
    let app_container = document.querySelector(`.${this.rootClass}`);
    app_container.classList.add(this.inVisibleClass);
    setTimeout(() => {
      app_container.classList.remove(this.visibleClass, this.inVisibleClass);
      self.setValue({errorActive: false,errorCode: -1});
    },1000);
  }
}
//export default new DarkErrorStore;
//export { DarkErrorStore };
export default DarkErrorStore;
