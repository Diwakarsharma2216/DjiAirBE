const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    PRODUCT_NAME: { type: String, require: true },
    INIT_VIDEO: { type: String, require: true },
    TEXT_VIDEO: { type: String, require: true },
    RKT_VIDEO1: { type: String, require: true },
    RKT_VIDEO2: { type: String, require: true },
    ACTUAL_PRO_IMAGE: { type: String, require: true },
    WAYPOINT_PRO_VID: { type: String, require: true },
    DARK_IMG: { type: String, require: true },
    TAB_VID1: { type: String, require: true },
    TAB_VID2: { type: String, require: true },
    TAB_VID3: { type: String, require: true },
    FINAL_PRO_IMG: { type: String, require: true },
    PRICE: { type: Number, require: true },

})

const PageModel = mongoose.model("dynamic_pages_data", productSchema);

module.exports = { PageModel };