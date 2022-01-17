const Warehouse = require('./warehouse');
const Item = require('./item');

// 1 to many
Warehouse.hasMany(Item);
Item.belongsTo(Warehouse);

// These will print all magic methods for a model!
const orderModel = Item;
console.log('\n\nOrder model can use:\n\n');
for (let assoc of Object.keys(orderModel.associations)) {
  for (let accessor of Object.keys(orderModel.associations[assoc].accessors)) {
    console.log(
      orderModel.name +
        '.' +
        orderModel.associations[assoc].accessors[accessor] +
        '()'
    );
  }
}
// These will print all magic methods for a model!
const userModel = Warehouse;
console.log('\n\n Warehouse model can use:\n\n');
for (let assoc of Object.keys(userModel.associations)) {
  for (let accessor of Object.keys(userModel.associations[assoc].accessors)) {
    console.log(
      userModel.name +
        '.' +
        userModel.associations[assoc].accessors[accessor] +
        '()'
    );
  }
}

module.exports = {
  Warehouse,
  Item,
};
