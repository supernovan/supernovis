var express = require("express")
var app = express()
app.set("view engine", "pug")
app.use("/images", express.static("public/images"))
app.use("/javascript", express.static("public/javascript"))
const routes = require("./routes/routes.js")


app.use("/", routes)

env = require("./config/env.js")

console.log(env)
if (env == "prod") {
	var net = require("net")
	var RaspiCam = require("raspicam")
	var fs = require("fs")
	var server = require("http").createServer(app)
	var io = require("socket.io").listen(server)
	var client = new net.Socket()
	var camera = new RaspiCam({
		mode: "photo", 
		output: "temp.jpg"
	})
	
	function base64_encode(file) {
		var bitmap = fs.readFileSync(file)
		return new Buffer(bitmap).toString("base64")
	}
	
	let img = new Buffer(base64_encode("temp.jpg"), "base64")
	
	camera.on("start", function() {
	})
	
	camera.on("read", function(err, timestamp, filename) {
		var base64str = base64_encode(filename)
		img = new Buffer(base64str, "base64")
		io.emit("frame", img.toString("base64"))
		io.emit("time", time)
		//console.log(img)
	})

	client.connect(1337, "192.168.1.184", function() {
	console.log("connected to lamp")
	})
	
	client.on("data", function(data) {
		var str = data.toString()
		camera.start()
	})
	
	
	
	let frame = ""
	let chuck = ""
	let time = new Date()
	
	io.on("connection", function (socket) {
		console.log("Client connected...")
		socket.emit("frame", img.toString("base64"))
		socket.emit("time", time)
		socket.on("join", function (data) {
			console.log("skicka data")
			client.emit("frame", img.toString("base64"))
		})
	
		socket.on("color", function (color) {
			var str = color.toString()
			const newtime = new Date();
	
			console.log(str);
			if (color.length == 6 && newtime.getTime() / 1000 -5 > time.getTime() / 1000) {
				time = newtime
				client.write("#" + str + "\n")
				camera.start()
			}
	
		})	
	})
}
app.listen(3000, () => console.log("listning on port 3000"))

