const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();
const {
  handleUpdate,
  handleDelete,
  getUser,
  getAllUser,
  getUserStat,
} = require("../controllers/user");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, handleUpdate);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, handleDelete);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, getUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, getAllUser);

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, getUserStat);

module.exports = router;
