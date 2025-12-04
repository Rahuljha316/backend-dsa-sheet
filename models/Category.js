const mongoose = require("mongoose");

const SubTopicSchema = new mongoose.Schema({
    name: String,
    leetCodeLink: String,
    youtubeLink: String,
    articleLink: String,
    level: {
        type: String,
        enum: ["EASY", "MEDIUM", "HARD"]
    }
});

const CategorySchema = new mongoose.Schema({
    title: String,
    subtopics: [SubTopicSchema]
});

module.exports = mongoose.model("categories", CategorySchema);
