const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    address: String,
    degree: String,
    university: String,
    graduationYear: String,
    jobTitle: String,
    employer: String,
    workDescription: String,
    skills: String
});

module.exports = mongoose.model('Resume', resumeSchema);