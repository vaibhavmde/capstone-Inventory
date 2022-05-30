const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrder,
  getMonthlyIncome,
  getMonthlySales,
} = require("../controllers/order");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);

// //GET ALL

router.get("/", verifyTokenAndAdmin, getAllOrder);

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
