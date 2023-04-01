const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
		const data = await Category.findAll({
			include: { model: Product },
		});
		if (!data) {
			res.status(404).json({ message: 'No Category with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    })
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json(err));
  });

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create({
      category_name: req.body.category_name,
    });
    if(!data) {
      res.status(404).json({ message: 'No Category with this id'});
      return;
    }
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!data) {
      res.status(404).json({ message: 'No Category with this id'});
      return;
    }
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!data) {
      res.status(404).json({ message: 'No Category with this id'});
      return;
    }
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
