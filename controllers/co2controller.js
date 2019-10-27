const db = require('../db/dbbridge')

exports.co2All = function (req, res, next) {
    db.query('SELECT * from co2', [], (err, result) => {
        if (err) {
            return next(err)
        }
        res.render(req.originalUrl.replace("/", ""), {rows : result})
    })
}
