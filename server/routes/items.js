const router = require('express').Router();
const { Item, Warehouse } = require('../db/models');

module.exports = router;

//Items CRUD

//Read All
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Item.findAll();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

// Create One
router.post('/', async (req, res, next) => {
  const { name, quantity, price } = req.body;
  try {
    const newProduct = await Item.create({
      name: name,
      quantity: quantity,
      price: price,
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});
