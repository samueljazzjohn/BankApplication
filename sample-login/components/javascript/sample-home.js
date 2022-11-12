Lyte.Component.register("sample-home", {
	data : function(){
		return {

		}		
	},
	actions : {
		addCustomer : function(event){
			user = store.peekAll("user")[0]
			console.log(user)
			console.log("userId----",user.user_id)
			// Lyte.Router.transitionTo({ route : 'staff.customer-signup', dynamicParams : [user.user_id]})
		},
		logout : function(){
			localStorage.clear()
			store.unloadAll( "user" );
			Lyte.Router.transitionTo('login')
		}
	}
});
