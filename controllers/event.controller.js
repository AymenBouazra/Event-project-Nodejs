const Event = require('../models/event');

exports.createEvent = async (req,res) => {
    try {
        await Event.create(req.body)
        res.send({message:'Event created successfully!'})
    } catch (error) {
        res.status(500).send({message: error.message || 'Server error'})
    }
}

exports.getAllEvents = async (req,res) => {
    try {
        const events = await Event.find()
        res.send(events)
    } catch (error) {
        res.status(500).send({message: error.message || 'Server error'})
    }
}

exports.getEventById = async (req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        res.send(event)
    } catch (error) {
        res.status(500).send({message: error.message || 'Server error'})
    }
}

exports.updateEventById = async (req,res) => {
    try {
        if (req.body.password = "") {
            const event = await Event.findById(req.params.id)
            req.body.password = event.password
            await Event.findByIdAndUpdate(req.params.id, req.body)
            res.send({message:'Event updated successfully!'})
        } else {
            await Event.findByIdAndUpdate(req.params.id, req.body)
            res.send({message:'Event updated successfully!'})
        }
    } catch (error) {
        res.status(500).send({message: error.message || 'Server error'})
    }
}

exports.deleteEventById = async (req,res) => {
    try {
        await Event.findByIdAndRemove(req.params.id)
        res.send({message:'Event deleted successfully!'})
    } catch (error) {
        res.status(500).send({message: error.message || 'Server error'})
    }
}