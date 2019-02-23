const mongoose = require('mongoose');


module.exports.postToDB = async (model, document) => {
    const modelFound = await mongoose.model(model)
    const resultPromise = await modelFound.create(document)

    return resultPromise;
}

module.exports.getFromDB = async (model, document) => {
    const modelFound = await mongoose.model(model)
    const resultPromise = await modelFound.findOne(document)

    return resultPromise;
}