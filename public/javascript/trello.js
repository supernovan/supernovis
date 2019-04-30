function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	console.log("drag " + ev.target.id)
    ev.dataTransfer.setData("src", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("src"));
    var srcParent = src.parentNode;
    var tgt = ev.currentTarget;
	console.log(ev.currentTarget.id + " : " + src.id)
	swap(ev, tgt, src)
}

function swap(ev, tgt, src) {
	var cloneTgt = tgt.cloneNode(true);
	var cloneSrc = src.cloneNode(true);
	console.log(cloneTgt)
	console.log(cloneSrc)
	var p = src.parentNode.cloneNode(true)
	console.log(p)
	if (tgt.id != src.id || tgt.id != "btn-list" || tgt.id != "btn-card") {
		src.replaceWith(cloneTgt);
		tgt.replaceWith(cloneSrc);
	}
}


var socket = io.connect();

	
socket.emit("getTable")

socket.on("updateTables", function(data) {
	console.log("123banan");
	var tables = Array.from(data)
	document.getElementById('tables').innerHTML=""
	console.log(tables)
	paintTables(tables)
});

socket.on("getTable", function(data) {
	console.log("banankontakt");
	var tables = Array.from(data)
	console.log(tables)
	paintTables(tables)
});

function addTable(){
	console.log("banankontakt123");

	let pos = 0
	//TODO find the max position and add 2024 to it

	let list = Array.from(document.getElementsByClassName("list"));
	if (list.length == 0) {
		pos = 2024
	} else {
		posList = list.map(x => parseFloat(x.getAttribute("pos")))
		console.log(posList)
		pos = Math.max.apply(null, posList) + 2024
		console.log( pos + " POS")
	}
	//pos = (list.childElementCount)*2024.0;

	var regex = "^[a-zA-ZåäöÅÄÖ]+$";

	var t = document.getElementById("tableText");
	var flag = false;
	var title = "";
	if (t != null) {
		title = t.value;
		if (title.length > 0 && title.match(regex)) {
			flag = true;
		}
	}

	console.log(flag + " : " + t);
	if (flag === true) {
		token = document.cookie;
		console.log(title + " " + pos);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', "http://localhost:3000/api/createTable", true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.send(JSON.stringify({"token" : token.replace("jwt=", ""), "title" : title, "pos" : pos}));
		toggleTextTable();
	}
}

function deleteTable(table) {
	var result = confirm("Do you really want to delete the table?");
	if (result) {
		let name = table.replace("-table-button", "")
		console.log(name);
		token = document.cookie;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', "http://localhost:3000/api/deleteTable", true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.send(JSON.stringify({"token" : token.replace("jwt=", ""), "title" : name}));
	}
}

function paintTables(tables) {
	sortedList = tables.sort(function (a, b){return b[1] - a[1];})

	for (i = 0; i < sortedList.length; i++) {
		document.getElementById('tables').insertAdjacentHTML("afterbegin", 
			`<div class="list" pos="${sortedList[i][1]}" id="${sortedList[i][0]}-table" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">
				<h4 class="list-title">${sortedList[i][0]}</h4>
				<input type="button" class="delete-btn" onclick="deleteTable(id)" id="${sortedList[i][0]}-table-button">

				<ul class="list-items">
				</ul>
				<button class="add-card-btn btn" id="btn-card">Add a card</button>
			</div>`)
	}

	document.getElementById('tables').insertAdjacentHTML("beforeend", 
			`
			<div class="add-list-btn">
			<button class="add-list-btn btn" id="btn-list" onclick="toggleTextTable()">Add a list</button>
			<div id="button-div">
				
			</div>
			</div>
				`)


	
}

function add() {
  	//Create an input type dynamically.
	console.log("banankontakt")
	socket.emit("addGetTable")
}

function toggleTextTable() {
	var d = document.getElementById("button-div")
	var t = document.getElementById("tableText")
	var b = document.getElementById("btn-add")
	if (t) {
    	t.parentNode.removeChild(t);
    	b.parentNode.removeChild(b);
	} else {
		d.insertAdjacentHTML("afterbegin", `
			<input type='text' id="tableText"><br>
			<button class="add-btn btn" id="btn-add" onclick="addTable()">Add</button>
			`);
	}
}

function toggleStuff() {
  var x = document.getElementById("addTrello");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
	