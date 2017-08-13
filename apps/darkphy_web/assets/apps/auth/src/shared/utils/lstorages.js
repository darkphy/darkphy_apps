let isStorage = false;
class lstorage {
    constructor() {
      this.alien = true;
      this.is = false;
      this.me = null;
    }
    init(){
      if (typeof(Storage) !== "undefined") {
          isStorage = true;
      }
      this.alien = this.isAlien();
      this.is = this.isF();
      this.me = this.meF();
    }
    isF(){
        return isStorage;
    }
    get(key) {
        return localStorage.getItem(key);
    }
    set(key) {
        localStorage.setItem(key);
    }
    isAlien() {
        return (this.get("AUTH_CODE")) ? false : true;
    }
    meF() {
        return this.get("BASIC_CUI");
    }
}
export default new lstorage;
