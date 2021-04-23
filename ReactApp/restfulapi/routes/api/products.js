const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
const auth = require('../../middlewares/auth');
const admin = require('../../middlewares/admin');
var { Product } = require("../../models/product");


//get products
router.get("/", async (req, res) => {
  console.log(req.user);
    let page= Number(req.query.page? req.query.page:1);
    let perPage = Number(req.query.perPage? req.query.perPage:10);
    let skipRecords = (perPage*(page-1));
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});
//get with id single
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present");
    return res.send(product); //everything is OK
  } catch (err) {
    return res.status(400).send("Invalid ID"); //format of ID is not correct
  }
});

router.put("/:id", validateProduct, async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product)
    return res.status(400).send("Product With given ID is not present");
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

router.delete("/:id", auth, admin,async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});

//Insert a Record
router.post("/",  validateProduct, async(req, res) => {
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
  });
  

module.exports = router;
