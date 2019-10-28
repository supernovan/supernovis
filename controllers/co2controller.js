const db = require('../db/dbbridge')

exports.co2All = function (req, res, next) {
    db.query('select * from co2 where current < NOW() - INTERVAL 1 DAY', [], (err, result) => {
        if (err) {
            return next(err)
        }
        res.render(req.originalUrl.replace("/", ""), {rows : result})
    })
}
