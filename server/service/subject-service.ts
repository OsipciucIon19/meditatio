const SubjectModel = require('../models/Subject')

class SubjectService {
    async getAllSubjects() {
        return SubjectModel.find()
    }
}

module.exports = new SubjectService()