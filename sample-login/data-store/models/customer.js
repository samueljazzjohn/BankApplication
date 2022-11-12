store.registerModel("customer",{
    customerId: Lyte.attr("number",{ primaryKey: true}),
    customerName: Lyte.attr('string'),
    customerPhone: Lyte.attr("string"),
    user : Lyte.belongsTo( "user" ,{ serialize : "partial" }),
    account : Lyte.belongsTo( "account" ,{ serialize : "partial" })
});
