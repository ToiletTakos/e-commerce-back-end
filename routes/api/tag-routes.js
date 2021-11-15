const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({})
  .then(allTag => res.json(allTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [ProductTag, Product]
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.bpdy.tag_name
  }).then(newTag => res.json(newTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updateTag => {
    if(!updateTag) {
      res.status(404).json({ message: 'No tag found with that id'});
      return;
    }
    res.json(updateTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteTag => {
    if(!deleteTag) {
      res.status(404).json({message: 'No tag found with that id'});
      return;
    }
    res.json(deleteTag)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
