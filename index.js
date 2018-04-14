var express = require("express")
var app = express()
app.set("view engine", "pug")
app.use("/images", express.static("public/images"))
const routes = require("./routes/routes.js")

app.use("/", routes)



app.listen(3000, () => console.log("listning on port 3000"))

