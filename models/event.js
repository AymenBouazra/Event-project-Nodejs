const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema(
    {
        eventName: String,
        eventDescription: String,
        eventDate: String,
        eventTime: String,
        photo: String,
        price: Number,
        availableTicketNumber: Number,
        eventType: String,
        location: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company"
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "tag"
            }
        ]
    },
    {
        timestamps: true, versionKey: false
    }
)
module.exports = mongoose.model('event', EventSchema, 'event')