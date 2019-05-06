var express = require("express")
var app = express()

// For authentication, only for admin.
var secret = require("./config/secret.js")
var session = require('express-session');

console.log(secret)
app.use(session({
	secret: secret,
	resave: true,
	saveUninitialized: true
}))

app.set("view engine", "pug")
app.use("/images", express.static("public/images"))
app.use("/javascript", express.static("public/javascript"))
app.use("/css", express.static("public/css"))

// For formhandling, used for loging in.
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Normal routes and apiroutes
const routes = require("./routes/routes.js")
const apiroutes = require("./routes/apiroutes.js")
app.use("/", routes)
app.use("*/api/", apiroutes)

//either production or development
env = require("./config/env.js")

//trello
const trelloCtrl = require("./controllers/trellocontroller.js")
//Database
var mongoose = require("mongoose")
var mongoDB = 'mongodb://localhost:27017/supernovis'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once("open", function (callback) {
	console.log("connection successful")
})



var server = require("http").createServer(app)
var io = require("./websocket").init(server)
global.io = io
server.listen(3000)

io.on("connection", function (socket) {
		console.log("Client connected...")
		socket.on("getLamp", function (data) {
			socket.emit("frame", img.toString("base64"))
			socket.emit("time", time)
		})

		socket.on("getTable", function (data) {
			console.log("We got here")
			trelloCtrl.getTable(function(d) {
				console.log(d)
				socket.emit("getTable", d)
			})			
		})

		socket.on("addGetTable", function (data) {
			console.log("We got here again?")
			console.log(data)
			trelloCtrl.createTable(function(d) {
				console.log(d)
				socket.emit("addGetTable", d)
			})			
		})
	
		socket.on("color", function (color) {
			var str = color.toString()
			const newtime = new Date();
	
			console.log(str);
			if (color.length == 6 && newtime.getTime() / 1000 -5 > time.getTime() / 1000) {
				time = newtime
				//client.write("#" + str + "\n")
				//camera.start()
			}
	
		})

		socket.on("newPicture", function (data) {
			const newtime = new Date();
	
			//camera.start()
	
		})
	})

//This is just connections for the productionserver and other things 
if (env == "prod") {
	var net = require("net")
	var fs = require("fs")
	
	let counter = 1

	const { spawn } = require('child_process');

	spawn('ls | grep "to" |  grep -o -E '[0-9]+' | sort -n', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
	  	if (stdout != null) {
			console.log(`stdout: ${stdout}`);
			counter = stdout
	  	}
	  	console.log(`stderr: ${stderr}`);
	});

	//ls | grep "to" |  grep -o -E '[0-9]+' | sort -n
	function base64_encode(file) {
		var bitmap = fs.readFileSync(file)
		return new Buffer(bitmap).toString("base64")
	}
	
	let img = new Buffer(base64_encode("temp.jpg"), "base64")
	
	
	camera.on("read", function(err, timestamp, filename) {
		var base64str = base64_encode("./public/images/plants/" + filename)
		img = new Buffer(base64str, "base64")
		io.emit("frame", img.toString("base64"))
		counter += 1
		//io.emit("time", time)
		//console.log(img)
	})

	var CronJob = require("cron").CronJob
	new CronJob('0 /2 17-24 * * *', function() {
		var filePath = `./public/images/plants/plant-${counter}.jpg`
		const photo = spawn('raspistill', ['-vf', '-hf', '-o', filePath])

		photo.on('close', (code) => {
	  		console.log(`Took picture`);
	  		var base64str = base64_encode(filePath)
	  		img = new Buffer(base64str, "base64")
			io.emit("frame", img.toString("base64"))
			counter += 1
		});

	})

	CronJob.start()

	//client.connect(1337, "192.168.1.184", function() {
	//console.log("connected to lamp")
	//})

	//client.on("data", function(data) {
	//	var str = data.toString()
	//	camera.start()
	//})
	
	
	
	let frame = ""
	let chuck = ""
	let time = new Date()
}	




