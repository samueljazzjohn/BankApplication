store.registerModel("user",{
    user_id: Lyte.attr("number",{ primaryKey: true}),
    email: Lyte.attr('string'),
    password: Lyte.attr("string"),
    type:Lyte.attr("string"),
    status : Lyte.attr("string"),
    customer : Lyte.belongsTo( "customer" ,{ serialize : "partial" })
});
