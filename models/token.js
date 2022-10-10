const mongoose = require("mongoose");
const { Schema } = mongoose;
const tokenSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'company' },
    token: String
}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('token', tokenSchema)