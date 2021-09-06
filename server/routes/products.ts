import express from "express";

const router = express.Router();

const products = require("../../app/controllers/product.controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("/products/");
    next();
});
// define the home page route

router.get("/list", products.findAll);
router.get("/:id", products.findOne);



export default router;
