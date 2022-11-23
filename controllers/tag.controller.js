const Tag = require('../models/tag');


exports.createTag = async (req, res) => {
    try {
        await Tag.create(req.body)
        res.send({ message: 'Tag created successfully!' })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Server error' })
    }
}

exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find()
        res.send(tags)
    } catch (error) {
        res.status(500).send({ message: error.message || 'Server error' })
    }
}

exports.getTagById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id)
        res.send(tag)
    } catch (error) {
        res.status(500).send({ message: error.message || 'Server error' })
    }
}

exports.updateTagById = async (req, res) => {
    try {
        await Tag.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: 'Tag updated successfully!' })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Server error' })
    }
}

exports.deleteTagById = async (req, res) => {
    try {
        await Tag.findByIdAndRemove(req.params.id)
        res.send({ message: 'Tag deleted successfully!' })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Server error' })
    }
}

exports.getAllTagsWithNewForm = async (req, res) => {
    try {
        const tags = await Tag.find()
        let newFormTags = []
        tags.map(tag=>{
            newFormTags.push({label:tag.title,value:tag._id})
        })
        res.send(newFormTags)
    } catch (error) {
        res.status(500).send({ message: error.message || 'Server error' })
    }
}