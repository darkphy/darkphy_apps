export const __RELAY_API_ENDPOINT__ = 'http://api.darkphy.dev:4000/graphiql/';
export const CURRENT_USER = 'CURRENT_USER';
export const UI_LANGUAGE = "UI_LANGUAGE";
export const UI_LANGUAGE_CODE = "UI_LANGUAGE_CODE";

export const BG_URL = 'http://i.imgur.com/BQFAZTe.jpg?1';

export const AMERICAN_WORDS = {
  hi: "Hi",
  sign_in: "Sign In",
  join: "Join",
  search: "Search",
  choose_account: "Choose an Account",
  another_account: "Use another Account",
  agree_terms: "By clicking Create Account you accept the terms and conditions.",
  bday: "Birthday",
  bday_save: "Save Birthday",
  male: "Male",
  female: "Female",
  tranny: "Other",

  emailphone: "Email or phone",
  pass: "Password",
  forgot_header: "Forgot Credentials",
  resend: "Resend Code",

  next: "Next",
};
export const AMERICAN_ERRORS = [
  { t : "Network Error", d : "Check your internet!"} ,
  { t : "Bad Parameters", d : "Some information required is not given"} ,
  { t : "Invalid Captcha", d : "You are a robot"} ,
  { t : "Not Found", d : "Whatever youre looking for has been moved or removed"} ,
  { t : "Unauthenticated", d : "You are being logged out"} ,
  { t : "Nothing Returned", d : "Looks like "} ,
];
export const getKeyFromError = (str) => {
  return str.toLowerCase().split(" ").join("_");
}
export const HASH = {
  join: 'join',
  pwd: 'pwd',
}
export const AUTH_TOKEN = "AUTH_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const USER_LIST = "USER_LIST";
