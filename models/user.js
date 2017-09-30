var mongoose = require("mongoose");
var pasportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    firstName: String,
    lastName: String,
    mobile: Number,
    userpic: String,
    country: { type: String, default: 'none' },
    socket: {
        isConnected: { type: Boolean, default: false },
        isOnline: { type: Boolean, default: false }
    },
    registered: { type: Date, default: Date.now },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

UserSchema.plugin(pasportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
