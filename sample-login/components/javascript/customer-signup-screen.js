Lyte.Component.register("customer-signup-screen", {
	// _observedAttributes :["customer_name","password"],
	data : function(){
		return {
			cname:Lyte.attr("string", { default : "n"}),
			// customerPhone:Lyte.attr("string"),
			// email:Lyte.attr("string"),
			// password:Lyte.attr("string"),
		}		
	},
	actions :{
		customerSignup: function (event) {
			event.preventDefault();
			var cname=this.getData("cname")
			console.log("---:"+cname)
			console.log(event.target[0].value)
			console.log(event.target[1].value)
			console.log(event.target[2].value)
			console.log(event.target[3].value)
			var data = { "email": event.target[1].value, "password": event.target[3].value,"type":"CUSTOMER", "customerName": event.target[0].value, "customerPhone": event.target[2].value, "status" : "OFFLINE" }
			if (Object.keys(this.getData("errors") === 0)) {
				// send a post request to save the user
			}

			

			store.findRecord("customer","1", data).then(function (res) {
				console.log(res.$)
				if (res.$.isError) {
					alert(res.$.error.user.message);
				} else {
					console.log("------",res.email);
					alert("Customer created successfully")
					user = store.peekAll("user")[0]
					console.log(store.peekAll("user"))
					console.log(user)
					console.log(user.user_id)
					Lyte.Router.transitionTo({ route : 'staff', dynamicParams : [user.user_id]});
					// Lyte.Router.transitionTo('login',{username:res.email});
				}
			});

			// $L.ajax ({
			// 	url :'http://localhost:8070/register-customer',
			// 	type:"POST",
			// 	dataType :'json',
			// 	contentType:"application/json",
			// 	data :{
			// 		email :event.target[1].value,
			// 		password :event.target[3].value,
			// 		type:"CUSTOMER",
			// 		customerName:event.target[0].value,
			// 		customerPhone : event.target[2].value,
			// 		status : "ONLINE" 

			// 	},
				
			// 	success :function(response ){
			// 		// Process the response 
			// 		console.log(response);
			// 	},
				
			// });
			
		}
	}
});
