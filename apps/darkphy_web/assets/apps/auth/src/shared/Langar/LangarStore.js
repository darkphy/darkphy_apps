import { observable, action, computed } from 'mobx';
import store from 'store';

import { axiosReturn } from '../utils';
import { AMERICAN_ERRORS, AMERICAN_WORDS, UI_LANGUAGE , UI_LANGUAGE_CODE } from '../utils/constants.js';



const er = AMERICAN_ERRORS;
const getAmericanWords = () => {
  let words = AMERICAN_WORDS;

    for(let x in er){
      if (er.hasOwnProperty(x)) {
        words[`e_${er[x].k}_t`] = er[x].t;
        words[`e_${er[x].k}_d`] = er[x].d;
      }
    }
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
      /*
        axios
          .get(`https://darkphy-2c8a8.firebaseio.com/${code}.json`)
          .then((data) => {
              let words = [];
              let res = ajaxTechnical(data);
              if(!res) return
              this.createLanguage(res,true);
          });
          */
          /*
          {
            info : {code: ,title:},
            dict : {}
          }
          */

    }
    getE = (error_code) => {
      let error_key = er[error_code].k;
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
