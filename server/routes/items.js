const router = require('express').Router();
const { Item, Warehouse } = require('../db/models');

module.exports = router;

//Items CRUD

/* 

*/

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
  const { name, quantity, price } = req.body;
  try {
    const newItem = await Item.create({
      name: name,
      quantity: quantity,
      price: price,
    });
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findByPk(itemId);
    res.json(await item.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete
router.delete('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findByPk(itemId);
    item.destroy();
    res.json(item);
  } catch (error) {
    next(error);
  }
});
