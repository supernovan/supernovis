var socket = io.connect();

socket.on("join", function(data) {

});

let img = new Image();
let data = "";

socket.on("frame", function(data) {
	//console.log(typeof(data.string))
	//console.log(decodeURIComponent(data.string));
	//console.log(data.string)
    
	//var str = data.toString().split("");

	//for (var i = 0; i < str.length-1; i+=2) {
   	//	 str[i] = "";
	//}

	//var test = str.join("");
	rorateImage(data);
	//document.getElementById("c").src = "data:image/png;base64, " + data; 
});


function rorateImage(dataServer) {
	data = dataServer;
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	
	img = new Image();
	
	img.onload = function() {
		//canvas.width = img.width;
		//canvas.height = img.height;
		ctx.translate(canvas.width, canvas.height);
		const scale = canvas.width/img.width;
		ctx.setTransform(-scale, 0, 0, -scale, canvas.width, canvas.height);
		//ctx.rotate(180*Math.PI/180);
		ctx.drawImage(img, 0, 0);
		//ctx.rotate(180*Math.PI/180);
	}
	img.src = "data:image/png;base64," +  data;
	
}

function updateFrame() {
	socket.emit("newPicture", "nbr");
	return false;
}

//var form = document.getElementById("form");
//	number = document.getElementById("hex");
//form.onsubmit = function() {
//	var nbr = number.value;
//	socket.emit("color", nbr);
//};
