const mongoose = require("mongoose");

const CompanyFavouriteSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true },
    companyID: { type: mongoose.Types.ObjectId, required: true }
});

const CompanyFavourite = mongoose.model("company_favourite", CompanyFavouriteSchema);
module.exports = CompanyFavourite;
