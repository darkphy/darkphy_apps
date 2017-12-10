import { observable, action } from 'mobx';
import { USER_LIST, gup } from 'shared/utils/constants.js';
import _ from 'lodash';
import { getToken } from 'shared/utils/auth.js';

const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
class LoginStore{
  @observable index =  0;
  @observable alien =  true;
  @observable currentHit =  null;
  @observable userList = [];
  @observable forcedAlien = false;

  @action setCurrentHit = (res) => {
    this.currentHit = res;
  };
  @action addUserList = (user) => {
    let u = this.userList;
    u.unshift(user);
    u = removeDuplicates(u,"id");
    this.userList = u;
    this.forcedAlien = false;

    localStorage.setItem(USER_LIST, JSON.stringify(this.userList));
    this.redirect();
  }
  @action handleChangeIndex = (index) => {
    this.index = index;
  };  
  redirect = () => {
    const _URL_ = 'http://darkphy.dev:2000/';
    let redirecturl = gup("redirect", window.location.href);
    const {access_token, refresh_token}  = getToken();
    if(!redirecturl) redirecturl = _URL_;
    redirecturl = `${_URL_}token/?access_token=${access_token}&refresh_token=${refresh_token}&id=${this.userList[0].id}`;
    document.location = redirecturl;
  }
  @action setValue = (key, value) => {
  	this[key] = value;
  }

}
export default new LoginStore;