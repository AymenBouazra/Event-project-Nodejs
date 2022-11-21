const mongoose = require('mongoose');
const { Schema } = mongoose;
const Company = new Schema({
    companyName: String,
    companyDescription: String,
    email: String,
    password: String,
    role: { type: String, default: 'Admin' },
    photo: { type: String, default: 'https://imgur.com/e5PnZbW.png' },
    events: [{ type: Schema.Types.ObjectId, ref: 'event' }]
},
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model('company', Company)