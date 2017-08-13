export const queryGQL = ({ client, DarkErrorStore, LangarStore }, query , variables, callback=()=>{},doResolve = true) => {
  return new Promise((resolve, reject) => {
    client.query({
      query,
      variables
    })
    .then(response => {
      const resProp = query.definitions[0].selectionSet.selections[0].name.value;
      if(doResolve){
        resolve();
        callback(response.data[resProp]);
      }else{
        callback(response.data[resProp], resolve);
      }
    })
    .catch( (err) => {
        if(!err.graphQLErrors) return false;
          const code = err.graphQLErrors[0].code;
          DarkErrorStore.setErrorParams(LangarStore.getE(code));
          DarkErrorStore.activateError({code : code})
          resolve();
      }
    );
  });
}
const firstProp = (obj) => {
  return obj[function() { for (var k in obj) return k }()];
}
