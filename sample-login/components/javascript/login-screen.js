Lyte.Component.register("login-screen", {
	data: function () {
		return {
			userId: Lyte.attr("number"),
		}
	},
	actions: {
		login: function (event, target) {
			console.log('----:' + this.getData("email"))
			event.preventDefault();
			console.log(event.target[0].value)
			console.log(event.target[1].value)
			var data = { email: event.target[0].value, password: event.target[1].value , use : "login"}
			// if (event.target[2].checked) {
			// 	console.log(event.target[2].value)
			// 	data["type"] = event.target[2].value
			// } else if (event.target[3].checked) {
			// 	console.log(event.target[3].value)
			// 	data["type"] = event.target[3].value
			// }

			console.log(data)
			if (Object.keys(this.getData("errors") === 0)) {
				// send a post request to save the user
			}

			// event.stopPropagation();
			// store.unloadAll( "user" );
			store.findRecord("user", "1", data).then(function (res) {
				console.log(res.user_id)
				console.log("usertype: ",res.type)
				// this.setData("userId",res.user_id)
				if (res.email) {
					// this.setData("userId",res.user_id)
					localStorage.setItem("isLoggedIn", true);
					localStorage.setItem("type",res.type)
					localStorage.setItem("user_id",res.user_id)
					console.log(localStorage.getItem("isLoggedIn"))
					if (res.type == 'CUSTOMER') {
						Lyte.Router.transitionTo({ route: 'customer', dynamicParams: [res.user_id] })
					} else if(res.type=='STAFF'){
						Lyte.Router.transitionTo({ route: 'staff', dynamicParams: [res.user_id] })
					}
				} else {
					var msg = document.getElementById("msg");
					msg.ltProp("message", "Login credentials does not match");
					msg.ltProp("type", "error");
					msg.ltProp("show", true);
					Swal.fire({
						// position: 'top-end',
						icon: 'error',
						title: 'Please enter valid credentials',
						showConfirmButton: false,
						timer: 2000
					  })
					// document.getElementById('alert').style.visibility="visible"
					// showYieldAlert('error',true,'Delete Profile','Confirm Delete','Please enter valid username and password','','',true,'right')
				}
			});
		}
	},
});

