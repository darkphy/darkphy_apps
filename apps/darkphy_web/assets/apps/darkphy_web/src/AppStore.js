import { observable,action } from 'mobx';

class AppStore{
    @observable theme;
    @observable id;
    constructor(){
       this.theme = 0
    }
    @action setDarkTheme(){
      this.theme = 0;
    }
    @action setLightTheme(){
      this.theme = 1;
    }
}

export default new AppStore;
