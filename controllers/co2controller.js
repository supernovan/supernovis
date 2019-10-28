const db = require('../db/dbbridge')

exports.co2All = function (req, res, next) {
    db.query('select * from co2 where current BETWEEN NOW() - INTERVAL \'24 HOURS\' AND NOW() ORDER BY current DESC', [], (err, result) => {
        if (err) {
            return next(err)
        }
        res.render(req.originalUrl.replace("/", ""), {rows : result})
    })
}
