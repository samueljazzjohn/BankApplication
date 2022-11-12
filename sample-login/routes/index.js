Lyte.Router.registerRoute('index',{
// 	getResources  : function (paramsObject ){ 
//         /* View related files should be returned as resources(HTML, CSS, components etc). It will be available before 'renderTemplate' hook. */
// },
// getDependencies  : function (paramsObject ){ 
//         /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
// },
beforeModel  : function (paramsObject ){ 
        /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
		// console.log("index---",localStorage.getItem("isLoggedIn"))
		// user = store.peekAll("user")[0]
		// if(localStorage.getItem("isLoggedIn")&&user.type=="STAFF"){
		// 	Lyte.Router.transitionTo({ route : 'staff', dynamicParams : [user.user_id]})
		// }else if(localStorage.getItem("isLoggedIn")&&user.type=="CUSTOMER"){
		// 	Lyte.Router.transitionTo({ route : 'customer', dynamicParams : [user.user_id]})
		// }
		if(localStorage.getItem("isLoggedIn") && localStorage.getItem("type")=="STAFF"){
			Lyte.Router.transitionTo({ route: 'staff', dynamicParams: [localStorage.getItem("user_id")] })
		}else if(localStorage.getItem("isLoggedIn") && localStorage.getItem("type")=="CUSTOMER"){
			Lyte.Router.transitionTo({ route: 'customer', dynamicParams: [localStorage.getItem("user_id")] })
		}
},
	model : function()	{
		console.log("index---",localStorage.getItem("isLoggedIn"))
		return {
			features : [
				{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
				{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
				{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
				{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
			]
		}
				
	},

	// redirect : function( model , params ){
		// if( this.transition.info.route == "login" ){
		// console.log(params)
		//   this.replaceWith( 'login' )
		// }
	//   },
// afterModel  : function (model, paramsObject ){ 
//         /* Manipulating data before returning data to component. */
// },
// redirect  : function (model, paramsObject ){ 
//     this.transitionTo( 'login' );
// },
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "welcome-comp"}
	}
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
