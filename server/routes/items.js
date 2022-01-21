const router = require('express').Router();
const { Item, Warehouse } = require('../db/models');

module.exports = router;

//Items CRUD

/* 

*/
async function checkItemParams(body) {
  const { name, quantity, price, WarehouseId } = body;
  console.log(name, quantity, price, WarehouseId);
  if (typeof price !== 'number' || typeof quantity !== 'number') {
    return 'price, quantity, & WarehouseId have to be a number';
  }
  if (typeof name !== 'string') return 'Name must be a valid string';

  if (WarehouseId && typeof WarehouseId === 'number') {
    const warehouse = await Warehouse.findByPk(WarehouseId);
    if (warehouse === null) {
      return 'That warehouse id does not exsist';
    }
  }
  return true;
}
//Read All
router.get('/', async (req, res, next) => {
  try {
    const allItems = await Item.findAll();
    res.json(allItems);
  } catch (error) {
    next(error);
  }
});

// Create One
router.post('/', async (req, res, next) => {
  try {
    const check = await checkItemParams(req.body);
    if (check !== true) {
      res.json(check);
    } else {
      const { name, quantity, price } = req.body;
      const newItem = { name: name, quantity: quantity, price: price };
      const itemCreated = await Item.create(newItem);
      if (req.body.WarehouseId) itemCreated.setWarehouse(req.body.WarehouseId);
      res.json(itemCreated);
    }
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/:itemId', async (req, res, next) => {
  // do check
  try {
    const check = await checkItemParams(req.body);
    if (check !== true) {
      return res.json(check);
    }
    const { itemId } = req.params;
    const { name, quantity, price } = req.body;

    const item = await Item.findByPk(itemId);
    const updatedItem = { name: name, quantity: quantity, price: price };
    const itemUpdated = await item.update(updatedItem);

    if (req.body.WarehouseId && req.body.WarehouseId !== item.WarehouseId)
      itemUpdated.setWarehouse(req.body.WarehouseId);

    res.json(itemUpdated);
  } catch (error) {
    next(error);
  }
});

// Delete
router.delete('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findByPk(itemId);
    if (item === null) return res.json('Warehouse does not exsist');
    item.destroy();
    res.json(item);
  } catch (error) {
    next(error);
  }
});
