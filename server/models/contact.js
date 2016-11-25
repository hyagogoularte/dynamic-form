var mongoose = require('mongoose');
module.exports = function() {
    var contact = mongoose.Schema({
        name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            index: true
        },
        state: {
            type: String,
            trim: true
        },
        level: {
            type: String,
            trim: true
        },
    });

    return mongoose.model('Contact', contact);
}
