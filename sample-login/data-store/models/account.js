store.registerModel("account",{
    accountNumber: Lyte.attr("number",{ primaryKey: true}),
    deposite: Lyte.attr('string'),
    customer : Lyte.belongsTo( "customer" ,{ serialize : "partial" })
});
