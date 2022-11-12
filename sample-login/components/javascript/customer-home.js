Lyte.Component.register("customer-home", {
	data: function (data) {
		// console.log("entered customer home : ")
		// console.log(data);
		// console.log(store.peekAll("customer"))
		// console.log(store.peekRecord("customer",'1'))
		// console.log(store.peekAll("customer").model.data)
		// console.log(store.peekAll("customer").model.data[0].customerName)


		return {
			user: Lyte.attr("object", { default: store.peekAll("customer") }),
			account: Lyte.attr("object", { default: store.peekAll("account") })
		}
	},
	init : function(){
		var account = store.peekAll("account")
		this.setData("account",account)
	},
	actions: {
		logout: function () {
			// store.clear()
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
					store.unloadAll("account")
					Lyte.Router.transitionTo('login')
				},
				error: function (error) {
					console.log(error)
					alert(error)
				}
			});
		},
		openDeposite: function () {
			var depositeModel = document.getElementById("deposite")
			depositeModel.ltProp("show", true)
		},
		openWithdrawal: function () {
			var depositeModel = document.getElementById("withdraw")
			depositeModel.ltProp("show", true)
		},
		deposite: function (event) {
			console.log(this.data.account[0].deposite)
			var model = this
			console.log("this---:", model.getData("account")[0].deposite)
			console.log("this---:", model.getData("account[0].deposite"))
			event.preventDefault();
			console.log(event.target[0].value)
			var data = { accountNumber: event.target[0].value, amount: event.target[1].value }
			var record = store.peekAll("account");

			$.ajax({
				url: 'http://localhost:8070/deposite',
				type: "PATCH",
				data: data,
				success: function (response) {
					// Process the response 

					record[0].$.set("deposite", response.Amount);
		
					Swal.fire({
						// position: 'top-end',
						icon: 'success',
						title: 'Successfully Updated',
						showConfirmButton: false,
						timer: 2000
					  })

					model.setData("account[0].deposite", response.Amount)
					console.log("hi---", model.getData("account[0].deposite"))
					// Lyte.Router.transitionTo({ route: 'customer', dynamicParams: [model.getData("user[0].user.user_id")] })
					var depositeModel = document.getElementById("deposite")
					depositeModel.ltProp("show", false)
				},
				error: function (error) {
					console.log(error)
					alert(error)
				}
			});
		},
		withdraw: function (event) {
			event.preventDefault();
			if ((this.data.account[0].deposite - event.target[1].value) > 0) {

				var model = this
				var record = store.peekAll("account")
				var data = { accountNumber: event.target[0].value, amount: event.target[1].value }
				// console.log(data)
				$.ajax({
					url: 'http://localhost:8070/withdraw',
					type: "PATCH",
					data: data,
					success: function (response) {
						console.log(response);
						record[0].$.set("deposite", response.Amount);
						// Process the response 
						Swal.fire({
						// position: 'top-end',
						icon: 'success',
						title: 'Successfully Updated',
						showConfirmButton: false,
						timer: 2000
					  })
						model.setData("account[0].deposite", response.Amount)
						console.log("user_id", model.getData("user[0].user.user_id"))
						Lyte.Router.transitionTo({ route: 'customer', dynamicParams: [model.getData("user[0].user.user_id")] })
						var depositeModel = document.getElementById("withdraw")
						depositeModel.ltProp("show", false)
					},
					error: function (error) {
						console.log(error)
						alert(error)
					}
				});
			}else{
				Swal.fire({
					// position: 'top-end',
					icon: 'error',
					title: "You haven't enough balance to withdraw",
					showConfirmButton: false,
					timer: 2000
				  })
				// Lyte.Router.transitionTo({ route: 'customer', dynamicParams: [model.getData("user[0].user.user_id")] })
			}
		},
		closeDepositeModel: function () {
			var depositeModel = document.getElementById("deposite")
			depositeModel.ltProp("show", false)
		},
		closeWithdrawModel: function () {
			var depositeModel = document.getElementById("withdraw")
			depositeModel.ltProp("show", false)
		},

	}
});
