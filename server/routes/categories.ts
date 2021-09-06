import express from "express";

const router = express.Router();

const categories = require("../../app/controllers/category.controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("/categories/");
    next();
});

router.get("/list", categories.findAll);
router.get("/:id", categories.findOne);



export default router;
