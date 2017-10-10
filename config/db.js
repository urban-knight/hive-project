module.exports = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    uri: "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME
}