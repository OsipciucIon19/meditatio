import {Course} from '../types'

const { Schema, model } = require('mongoose')

const CourseSchema: Course = new Schema({
    title: { type: String },
    category: { type: String },
    description: { type: String },
    imagePath: { type: String },
    price: { type: Number },
    status: { type: String },
    content: { type: String }
})

module.exports = model('Course', CourseSchema)
