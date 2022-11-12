Lyte.Component.register("staff-home", {
	data: function (data) {
		
		console.log("inside staff home", store.peekAll("user")[0])
		console.log("array:",store.peekAll("customer")[0])
		console.log("Array :",store.peekAll("staff")[0])
		return {
			users : Lyte.attr("object", { default: store.peekAll("user") }),
			staff : Lyte.attr("object",{default : store.peekAll("staff")[0]}),
			customers : Lyte.attr("object",{default : store.peekAll("customer")}),
		}
	},
	init: async function(){
		data={user_id:localStorage.getItem("user_id")}

		await store.findAll("customer").then(function(res){
			console.log("customer",res)
		})
		var customers = store.peekAll("customer")
		this.setData("customes",customers)
		console.log("---data",customers[0].customerName)
	},
	actions: {
		addCustomer: function (event) {
			// user = store.peekAll("user")[0]
			// console.log(user)
			// console.log("userId----",user.user_id)
			// var depositeModel = document.getElementById("add-customer")
			// depositeModel.ltProp("show", true)
			// Lyte.Router.transitionTo({ route : 'staff.add-customer', dynamicParams : [user.user_id]})

			event.preventDefault();
			var data = { "email": event.target[1].value, "password": event.target[3].value, "type": "CUSTOMER", "customerName": event.target[0].value, "customerPhone": event.target[2].value, "status": "OFFLINE" }

			store.findRecord("customer", "1", data).then(function (res) {
				console.log(res.$)
				if (res.$.isError) {
					alert(res.$.error.user.message);
				} else {
					console.log("------", res.email);
					Swal.fire({
						// position: 'top-end',
						icon: 'success',
						title: 'Customer added successfully',
						showConfirmButton: false,
						timer: 2000
					  })
					user = store.peekAll("user")[0]
					console.log(store.peekAll("user"))
					console.log(user)
					console.log(user.user_id)
					var depositeModel = document.getElementById("add-customer")
					depositeModel.ltProp("show", false)
					// Lyte.Router.transitionTo('login',{username:res.email});
				}
			});
		},
		closeCustomerModel: function (event) {
			var depositeModel = document.getElementById("add-customer")
			depositeModel.ltProp("show", false)
		},
		openCustomerModel: function (event) {
			var depositeModel = document.getElementById("add-customer")
			depositeModel.ltProp("show", true)
		},
		logout: function () {
			data={user_id:localStorage.getItem("user_id")}
			$.ajax({
				url: 'http://localhost:8070/logout',
				type: "PATCH",
				data: data,
				success: function (response) {
					localStorage.clear()
					store.unloadAll("user");
					store.unloadAll("customer");
					store.unloadAll("staff")
					Lyte.Router.transitionTo('login')
				},
				error: function (error) {
					console.log(error)
					alert(error)
				}
			});
		}
	}
});
