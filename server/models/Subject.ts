import {Subject} from '../types'

const { Schema, model } = require('mongoose')

const SubjectSchema: Subject = new Schema({
    title: { type: String },
    grade: { type: Number }
})

module.exports = model('Subject', SubjectSchema)