const mongoose = require("mongoose");

const CompanyLikeSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true },
    companyID: { type: mongoose.Types.ObjectId, required: true }
});

const CompanyLike = mongoose.model("company_like", CompanyLikeSchema);
module.exports = CompanyLike;
