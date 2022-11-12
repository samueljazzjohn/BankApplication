store.registerAdapter( "account" , {
    namespace : "v2",
    buildURL : function( modelName , type , queryParams , payLoad , url , actionName , customData ){
        console.log("model"+modelName)
        console.log("query :"+queryParams)
        queryParams.default = true;
      if( modelName == "account"){
        url='http://localhost:8070/account-balance'
      }
      return url;
    },
    // methodForRequest : function( method , type , queryParams , customData, actionName, key ){
    //     if(queryParams.type=="CUSTOMER"){
    //         method='POST';
    //     }
    //     return method;
    //   }
  })