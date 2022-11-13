const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        }
      ]
    })
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        }
      ]
    })
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createdCategory = await Category.create({
      name: req.body.name,
    })
    res.status(200).json(createdCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.findByPk(req.params.id);
  
    const updatedCategory = await updateCategory.update({
      name: req.body.name
    })
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
