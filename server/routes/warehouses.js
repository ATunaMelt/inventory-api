const router = require('express').Router();
const { Item, Warehouse } = require('../db/models');

//Read All
router.get('/', async (req, res, next) => {
  try {
    const allWarehouses = await Warehouse.findAll();
    res.json(allWarehouses);
  } catch (error) {
    next(error);
  }
});

// Create One
router.post('/', async (req, res, next) => {
  const { name, city, state } = req.body;
  try {
    const newWarehouse = await Warehouse.create({
      name: name,
      city: city,
      state: state,
    });
    res.json(newWarehouse);
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Warehouse.findByPk(itemId);
    res.json(await item.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete
router.delete('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Warehouse.findByPk(itemId);
    item.destroy();
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
