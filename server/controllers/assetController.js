const Asset = require("../model/assetSchema");

/**
 * @desc    Add new asset
 * @route   POST /api/assets
 * @access  President, Vice President
 */
exports.addAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Get all assets
 * @route   GET /api/assets
 * @access  All roles
 */
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find()
      .populate("currentHolder", "name role");
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Issue asset
 * @route   PUT /api/assets/issue/:id
 * @access  President, Vice President
 */
exports.issueAsset = async (req, res) => {
  try {
    const { userId } = req.body;
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.status !== "Available") {
      return res.status(400).json({ message: "Asset not available" });
    }

    asset.status = "Issued";
    asset.currentHolder = userId;

    await asset.save();

    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Return asset
 * @route   PUT /api/assets/return/:id
 * @access  President, Vice President
 */
exports.returnAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    asset.status = "Available";
    asset.currentHolder = null;

    await asset.save();

    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
