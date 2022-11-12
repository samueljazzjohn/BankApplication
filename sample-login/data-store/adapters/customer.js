store.registerAdapter( "customer" , {
    namespace : "v2",
    buildURL : function( modelName , type , queryParams , payLoad , url , actionName , customData ){
        console.log("model"+modelName)
        console.log("query :"+queryParams)
        console.log("type :"+type)
        queryParams.default = true;
      if( modelName == "customer" && queryParams.type=="CUSTOMER"){
        url='http://localhost:8070/register-customer'
      }else if( queryParams.user_id > 0 ){
        url = 'http://localhost:8070/customer-details'
      }else{
        url = 'http://localhost:8070/all-customers'
      }
      return url;
    },
    methodForRequest : function( method , type , queryParams , customData, actionName, key ){
        if(queryParams.type=="CUSTOMER"){
            method='POST';
        }else {
          method = 'GET'
        }
        return method;
      }
  })