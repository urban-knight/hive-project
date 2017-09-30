const cookieParser = require('cookie-parser');
const passportSocketIo = require("passport.socketio");
const User = require('./../models/user');

const { promisifyAll } = require('bluebird');
const mongoose = require('mongoose');
promisifyAll(mongoose);

const setDisconnected = async (userId) => {
    const user = await User.findByIdAsync(userId);
    if (!user.socket.isConnected) {
        await User.findByIdAndUpdateAsync(user._id, {
            $set: { 'socket.isOnline': false }
        });
        console.log(user.username + ' is offline!');
    }
}

module.exports = function (server, sessionStore, passport) {
    io = require('socket.io')(server);

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        secret: 'encrypt',
        store: sessionStore,
        success: onAuthorizeSuccess,
        fail: onAuthorizeFail,
        passport: passport
    }));

    function onAuthorizeSuccess(data, accept) {
        accept(); //Let the user through
    }

    function onAuthorizeFail(data, message, error, accept) {
        if (error) accept(new Error(message));
        accept(null, false);
    }

    io.sockets.on('connection', function (socket) {
        if (!socket.request.user.logged_in) {
            console.log("inkognito connection");
        } else {
            var id = socket.request.user._id;

            socket.on('user_connect', async (_id) => {
                id = _id;
                var _user = await User.findByIdAsync(_id);
                if (!_user.socket.isConnected) user = await User.findByIdAndUpdateAsync(_id, {$set: {"socket.isConnected": true}});
                if (!_user.socket.isOnline) {
                    user = await User.findByIdAndUpdateAsync(_id, {$set: {"socket.isOnline": true}});
                    console.log(user.username + " is online now!");
                }             
            });
            
            socket.on('disconnect', async () => {
                await User.findByIdAndUpdateAsync(id, { $set: { "socket.isConnected": false } });
                setTimeout(setDisconnected, 10000, id);
            });
        }
    });
    return io;
};
