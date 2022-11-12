Lyte.Router.registerRoute("customer",{

    renderTemplate : function()	{
		return {outlet : "#outlet",component : "customer-home"}
	},
// 	getResources  : function (paramsObject ){ 
//         /* View related files should be returned as resources(HTML, CSS, components etc). It will be available before 'renderTemplate' hook. */
// },
// getDependencies  : function (paramsObject ){ 
//         /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
// },
beforeModel  : function (paramsObject ){ 
        /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
        console.log("customer---",localStorage.getItem("isLoggedIn"))
		user = store.peekAll("user")[0]
		if(!localStorage.getItem("isLoggedIn")){
			Lyte.Router.transitionTo('login')
		}else if(localStorage.getItem("isLoggedIn") && localStorage.getItem("type")=="STAFF"){
			Lyte.Router.transitionTo({ route: 'staff', dynamicParams: [localStorage.getItem("user_id")] })
		}
},
model  : function (paramsObject ){ 
        /* Initiate data request that are necessary for the current page. */
        console.log("customer---",localStorage.getItem("isLoggedIn"))
        user = store.peekAll("user")[0]
        data={user_id:localStorage.getItem("user_id")}
        console.log(user)
        store.findRecord("customer","1",data).then(function(res){
            console.log("response:",res.customerName)
            var record=store.findRecord("account","1",{customer_id:res.customerId})
            console.log(record)
        })
}
// afterModel  : function (model, paramsObject ){ 
//         /* Manipulating data before returning data to component. */
// },
// redirect  : function (model, paramsObject ){ 
//         /* Redirections based on data fetched. */
// },
// renderTemplate  : function (model, paramsObject ){ 
//         /* return where and what to render.(container and component/HTML) */
// },
// afterRender  : function (model, paramsObject ){ 
//         /* Post processing of rendered page. */
// },
// beforeExit  : function (model, paramsObject ){ 
//         /* Will be invoked before a route is removed from view. */
// },
// didDestroy  : function (model, paramsObject ){ 
//         /* Will be invoked when a route is completly destroyed(remove residues of route. eg: file cache removal). */
// },
// actions  : { 
//        onBeforeLoad  : function (paramsObject ){ 
//                 /* Triggered once route transition starts. */
//         },
//        onError  : function (error, pausedTrans, paramsObject ){ 
//                 /* Triggered by error on file load or on data request. */
//         },
//        willTransition  : function (transition ){ 
//                 /* Triggered before a transition is going to change. */
//         },
//        didTransition  : function (paramsObject ){ 
//                 /* Triggered after completion of transition. */
//         },
// }
});
