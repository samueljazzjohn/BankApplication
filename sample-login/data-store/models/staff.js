store.registerModel("staff",{
    staffId: Lyte.attr("number",{ primaryKey: true}),
    sname: Lyte.attr('string'),
    phone: Lyte.attr("string")
});
