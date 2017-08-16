import { observable, action, computed } from 'npmmod/mobx';
import store from 'npmmod/store';

import { axiosReturn } from '../utils';
import { getKeyFromError, AMERICAN_ERRORS, AMERICAN_WORDS, UI_LANGUAGE , UI_LANGUAGE_CODE } from '../utils/constants.js';



const er = AMERICAN_ERRORS;
const getAmericanWords = () => {
  let words = AMERICAN_WORDS;
  er.map((x)=> {
      x.k = getKeyFromError(x.t);
      words[`e_${x.k}_t`] = x.t;
      words[`e_${x.k}_d`] = x.d;
  });
  return words;
}
const errrorParseKey = (key,type) => {
  let a = "";
  switch(type){
    case 't':
      a = `e_${key}_t`;
    break;
    case 'd':
      a = `e_${key}_d`;
    break;
  }
  return a;
}

class LangarStore{
  @observable id;
    constructor(){
      this.id = null;
      this.title = null;
      this.words = getAmericanWords();
    }
    @action setCode = (code) => {
      let self = this;
      if(code.toLowerCase() == 'en_us'){
        self.id = null;
        self.words = getAmericanWords();
        store.remove(UI_LANGUAGE_CODE);
        return false;
      }
      store.set(UI_LANGUAGE_CODE,code);
      let o = store.get(UI_LANGUAGE);
      if(o){
        if(o.info.code == code){
          self.id = o.info.code;
          self.words = o.dict;
        }else{
          self.getLangFromFirebase(code);
        }
      }else{
        self.getLangFromFirebase(code);
      }
    }
    getLangFromFirebase(code){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              let words = [];
              let res = xhttp.responseText;
              if(!res) return
              this.createLanguage(res, true);
           }
        };
        xhttp.open("GET", `https://darkphy-2c8a8.firebaseio.com/${code}.json`, true);
        xhttp.send();

          /*
          {
            info : {code: ,title:},
            dict : {}
          }
          */

    }
    getE = (error_code) => {
      if(!er[error_code]){
        return undefined;
      }
      let error_key = getKeyFromError(er[error_code].t);
      let errorObj = {
        title : this.getW(errrorParseKey(error_key,'t')),
        description : this.getW(errrorParseKey(error_key,'d'))
      };
      return errorObj;
    }
    getW = (index_name) => {
      /*eslint-disable*/ if(this.id){} //dirty hack this func gets called everytime id changes/*eslint-enable*/
      return this.getWCached(index_name);
    }
    getWCached = (index_name) => {
      return this.words[index_name];
    }
    createLanguage = (res,doSetId = false) => {
      store.set(UI_LANGUAGE,res)
      if(doSetId){
        this.id = res.info.code;
      }
      this.words = res.dict;
    }
    createEnglish = () => {
        let res =
        {
          info: {code: 'en_US',title: 'American English'},
          dict: getAmericanWords()
        };
        this.createLanguage(res);
    }
  }
  export default new LangarStore;
