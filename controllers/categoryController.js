const Category = require("../models/Category")
const User = require("../models/User")


const getCategories = async (req, res) => {

    try {
        const categories = await Category.find()
        const user = await User.findById(req.user.id);

        const completed = user.progress;
        res.status(200).json({ categories, completed });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const updateProgress = async (req, res) => {
    const { categoryId, subtopicId, action } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        
        const category = await Category.findById(categoryId);
        if (!category) return res.status(400).json({ message: "Invalid categoryId." });

        const validSubtopic = category.subtopics.some(
            s => s._id.toString() === subtopicId
        );
        if (!validSubtopic) {
            return res.status(400).json({ message: "Invalid subtopicId." });
        }

        if (action === "ADD") {
            const exists = user.progress.some(
                p => p.categoryId.toString() === categoryId &&
                    p.subtopicId.toString() === subtopicId
            );

            if (!exists) {
                user.progress.push({ categoryId, subtopicId });
            }

        } else if (action === "REMOVE") {
            user.progress = user.progress.filter(
                p => !(p.categoryId.toString() === categoryId &&
                    p.subtopicId.toString() === subtopicId)
            );

        } else {
            return res.status(400).json({ message: "Invalid action." });
        }

        await user.save();

        res.json({
            message: action === "ADD" ? "Marked as done" : "Marked pending",
            progress: user.progress
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    updateProgress
}