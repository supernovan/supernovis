// database config
var dbsecrets = require("../config/dbsecrets")

//Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: dbsecrets.user,
    host: dbsecrets.host,
    database: dbsecrets.database,
    password: dbsecrets.password,
    port: dbsecrets.port
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}