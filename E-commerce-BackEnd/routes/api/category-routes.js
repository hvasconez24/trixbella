const router = require('express').Router();
const { Category, Product } = require('../../models');
const { sync } = require('../../models/Tag');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const response = await Category.findAll({
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
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;

  const response = await Category.findOne({
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
  // create a new category

  let category_name = req.body.category_name;

  const response = await Category.create({
    category_name: category_name,
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
  // update a category by its `id` value
  const { id } = req.params;

  let category_name = req.body.category_name;

  const response = await Category.update({
    category_name: category_name,
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
  // delete a category by its `id` value
  const { id } = req.params;

  const response = await Category.destroy({
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
