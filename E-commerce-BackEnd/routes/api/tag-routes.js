const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const response = await Tag.findAll({
    include: [{model: Product}]
  })
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })
  
  if(response.success){
    res.json(response.data);
  }else{    
    res.status(400).json({ error: response.error });
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;

  const response = await Tag.findOne({
    where: { id: id},
    include: [{model: Product}]
  })
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error=>{
    const res = { success: false, error: error }
    return res;
  })

  if(response.success){
    res.json(response.data);
  }else{
    res.status(400).json({ error: response.error });
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  let tag_name = req.body.tag_name;

  const response = await Tag.create({
    tag_name: tag_name,
  })
  .then(function(data){
    const res = { success: true, data: data, message:"created successful" }
    return res;
  })
  .catch(error=>{
    const res = { success: false, error: error }
    return res;
  })

  if(response.success){
    res.json(response.data);
  }else{
    res.status(400).json({ error: response.error });
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;

  let tag_name = req.body.tag_name;

  const response = await Tag.update({
    tag_name: tag_name,
  },{
    where: { id: id}
  })
  .then(function(data){
    const res = { success: true, data: data, message:"updated successful" }
    return res;
  })
  .catch(error=>{
    const res = { success: false, error: error }
    return res;
  })
  
  if(response.success){
    res.json(response.data);
  }else{
    res.status(400).json({ error: response.error });
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  const { id } = req.params;

  const response = await Tag.destroy({
    where: { id: id},
  })
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })  

  if(response.success){
    res.json(response.data);
  }else{
    res.status(400).json({ error: response.error });
  }

});

module.exports = router;
