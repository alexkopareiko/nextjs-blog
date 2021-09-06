import express from "express";

const router = express.Router();

import usersRouter from "./users";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import reviewsRouter from "./reviews";

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("/api/");
  next();
});

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/reviews", reviewsRouter);

export default router;
