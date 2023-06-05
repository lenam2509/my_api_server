const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}
    , {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);

