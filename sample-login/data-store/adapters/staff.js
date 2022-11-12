store.registerAdapter( "staff" , {
    namespace : "v2",
    buildURL : function( modelName , type , queryParams , payLoad , url , actionName , customData ){
        console.log("model"+modelName)
        queryParams.default = true;
      if( modelName == "staff" && queryParams.type=="STAFF" ){
        url='http://localhost:8070/register-staff'
      }else{
        url='http://localhost:8070/staff-details'
      }
      return url;
    }
  })