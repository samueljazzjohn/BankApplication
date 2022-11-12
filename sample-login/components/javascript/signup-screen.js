Lyte.Component.register("signup-screen", {
	data: function () {
		return {

		}
	},
	actions: {
		signup: function (event, target) {
			console.log(event.target[0].value)
			console.log(event.target[1].value)
			console.log(event.target[2].value)
			console.log(event.target[3].value)
			var data = { "email": event.target[1].value, "password": event.target[3].value,"type":"STAFF", "satffName": event.target[0].value, "staffPhone": event.target[2].value }
			// if (Object.keys(this.getData("errors") === 0)) {
			// 	// send a post request to save the user
			// }

			event.preventDefault();

			store.findRecord("staff","1", data).then(function (res) {
				console.log(res.$)
				if (res.$.isError) {
					alert(res.$.error.user.message);
				} else {
					console.log("------",res.email);
					alert("Staff created successfully")
					user = store.peekAll("user")[0]
					console.log(store.peekAll("user"))
					console.log(user)
					console.log(user.user_id)
					Lyte.Router.transitionTo({ route : 'home', dynamicParams : [user.user_id]});
					// Lyte.Router.transitionTo('login',{username:res.email});
				}
			});

			// store.findAll("user", data).then(function (res) {
			// 	if (res.$.isError) {
			// 		alert("Error");
			// 	} else {
			// 		console.log("------",res.username);
			// 		Lyte.Router.transitionTo('login',{username:res.username});
			// 	}
			// });
		}
	},
	methods: {

	}
});
