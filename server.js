const dotenv = require('dotenv').config({path: './config/.env'});
const    app  = require("./app");


app.listen(process.env.APP_PORT, function(err) {
    console.log("Starting up NodeJS Website service...");
    if (!err) console.log('HTTP Website Server listening at: http://' + process.env.APP_HOST + ":" + process.env.APP_PORT);
});
