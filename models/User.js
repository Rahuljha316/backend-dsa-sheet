const { default: mongoose, mongo } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    progress: [
        {
            categoryId: mongoose.Schema.Types.ObjectId,
            subtopicId: mongoose.Schema.Types.ObjectId
        }
    ]


});


module.exports = mongoose.model('User', UserSchema)