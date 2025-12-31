const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  addAsset,
  getAllAssets,
  issueAsset,
  returnAsset
} = require("../controllers/assetController");

/**
 * GET all assets
 * Access: All logged-in users
 */
router.get("/", authenticate, getAllAssets);

/**
 * Add new asset
 * Access: President, Vice President
 */
router.post(
  "/",
  authenticate,
  roleMiddleware("president", "vice_president"),
  addAsset
);

/**
 * Issue asset
 * Access: President, Vice President
 */
router.put(
  "/issue/:id",
  authenticate,
  roleMiddleware("president", "vice_president"),
  issueAsset
);

/**
 * Return asset
 * Access: President, Vice President
 */
router.put(
  "/return/:id",
  authenticate,
  roleMiddleware("president", "vice_president"),
  returnAsset
);

module.exports = router;

