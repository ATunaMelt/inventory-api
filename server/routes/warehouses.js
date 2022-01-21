const router = require('express').Router();
const { Item, Warehouse } = require('../db/models');

async function checkParams(body) {
  const { name, city, state } = body;
  if (
    typeof state !== 'string' ||
    typeof city !== 'string' ||
    typeof name !== 'string'
  ) {
    return 'name, state & city have to be a string';
  }
  return true;
}

async function warehouseValid(id) {
  if (typeof id !== 'number') return 'id must be a valid number';
  const warehouse = await Warehouse.findByPk(id);
  if (warehouse === null) {
    return 'That warehouse id does not exsist';
  }
  return warehouse;
}

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
  try {
    const check = await checkParams(req.body);
    if (check !== true) return res.json(check);
    const { name, city, state } = req.body;
    const newWarehouse = { name: name, city: city, state: state };
    const warehouseCreated = await Warehouse.create(newWarehouse);
    res.json(warehouseCreated);
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/:warehouseId', async (req, res, next) => {
  try {
    let { warehouseId } = req.params;
    warehouseId = parseInt(warehouseId);
    if (isNaN(warehouseId)) return res.send('id must be number');
    const check = await checkParams(req.body);
    if (check !== true) return res.send(check);
    const warehouse = await warehouseValid(warehouseId);
    if (typeof warehouse === 'string') return res.send(warehouse);
    res.json(await warehouse.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete
router.delete('/:warehouseId', async (req, res, next) => {
  try {
    let { warehouseId } = req.params;
    warehouseId = parseInt(warehouseId);
    if (isNaN(warehouseId)) return res.json('id must be number');
    const warehouse = await warehouseValid(warehouseId);
    if (typeof warehouse === 'string') return res.send(warehouse);
    res.json(await warehouse.destroy());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
