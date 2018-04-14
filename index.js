var express = require("express")
var app = express()
app.set("view engine", "pug")

app.get("/", function (req, res) {
	res.render("index")
})

app.listen(3000, () => console.log("listning on port 3000"))

