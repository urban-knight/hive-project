var mongoose = require("mongoose");
var pasportLocalMongoose = require("passport-local-mongoose");

var ItemCartSchema = mongoose.Schema({
    id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    count: Number
});

var UserSchema = mongoose.Schema({
    type: { type: String, default: "Active" },
    avatar: String,
    username: String,
    password: String,
    email: String,
    phone: Number,
    address: {
        country: String,
        city: String,
        street: String,
        zip: Number
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    active_orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    archieved_orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    cart: [ItemCartSchema]
});

UserSchema.plugin(pasportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);