// Lyte.Router.configureDefaults({baseURL:'',history : "html5"});

Lyte.Router.configureDefaults({});
Lyte.Router.configureRoutes(function(){
	this.route('index',{path:'/'});
	// this.route("signup",{ path :"/signup"});
	this.route("login",{ path :"/login"});
	this.route("staff",{ path :"/staff-home/:userId"},function(){
		this.route("add-customer",{ path :"/addcustomer"});
	});
	// this.route("user-type",{ path :"/user-type"});
	this.route("customer",{ path :"/customer/:userId"});
	// this.route("home",{ path :"/staff-home/:userId"});
});

// Lyte.Router.configureRoutes(function(){
// 	//this.route('index',{path:'/'});
// 	this.route('index',{path:'/'},function(){
// 		this.route("shop",{path:"/shop"},function(){
// 			this.route("list",{path :"/list"});
// 			this.route("show", { path:"/show/:id"});
// 			//this.route("category",{path:"/:type"});
// 			this.route("cart",{path :"/cart"});
// 			this.route("order",{path :"/order/:id"});
// 			this.route("wishlist",{path :"/wishlist"});
// 			this.route("order-item",{ path :"/orderitem"});
// 		});
// 	});
// 	this.route("error",{ path :"/*anything"});
// });

Lyte.Router.beforeRouteTransition = function() {
	console.log('before Route Change');
}

Lyte.Router.afterRouteTransition = function() {
	console.log('after Route Change');
}

