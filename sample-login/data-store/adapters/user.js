store.registerAdapter( "user" , {
    namespace : "v2",
    buildURL : function( modelName , type , queryParams , payLoad , url , actionName , customData ){
        console.log("model "+modelName)
        console.log("query:  "+queryParams.type)
        console.log(payLoad)
        queryParams.default = true;
      if( modelName == "user" && queryParams.use=="login"){
        url='http://localhost:8070/login'
      }else{
        url = 'http://localhost:8070/users'
      }
      return url;
    }
  })