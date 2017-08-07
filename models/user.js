var mongoose = require("mongoose");
var pasportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    userpic: String,
    isOnline: Boolean,
    registered: Date,
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

UserSchema.plugin(pasportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);