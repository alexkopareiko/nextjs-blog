import express from "express";

const router = express.Router();

const reviews = require("../controllers/review.controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("/reviews/");
    next();
});
// define the home page route

router.get("/list", reviews.findAll);
router.get("/:id", reviews.findReviewsByProductId);



export default router;
