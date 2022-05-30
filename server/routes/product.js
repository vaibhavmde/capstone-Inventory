const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require("../controllers/product");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/find/:id", verifyToken, getProduct);

//GET ALL PRODUCTS
router.get("/", verifyToken, getAllProduct);

module.exports = router;
