var mongoose = require("mongoose");

var NewsSchema = mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    title: { 
        type: String, 
        default: "<h3>Empty post</h3>" 
    },
    body: { 
        type: String, 
        default: "<p>Lorem Ipsum</p>" 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ]
});

module.exports = mongoose.model("News", NewsSchema);
