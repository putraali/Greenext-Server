const express = require("express");
const router = express.Router();

const {
  addCatalog,
  getOrfindCatalog,
  updateCatalog,
  getCatalogById,
  deleteCatalog,
} = require("../controllers/techCatalogController");

router.get("/", getOrfindCatalog);
router.post("/", addCatalog);
router.put("/:id", updateCatalog);
router.get("/:id", getCatalogById);
router.delete("/:id", deleteCatalog);

module.exports = router;
