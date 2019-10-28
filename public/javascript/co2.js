console.log(rows)
var arrt = rows.rows
console.log(arrt)
var dps = []
var dpsL = []
var n = new Date()

arrt.forEach(d => {
	var diff = (n - Date.parse(d.current))/3600000
	dps.push({label: d.current, x: diff, y: parseFloat(d.ppm)})
	dpsL.push({label: d.current, x: diff, y: parseFloat(d.lux)})
})

console.log(dps)
console.log(dpsL)

var chart = new CanvasJS.Chart("chartContainer1",
	{
		title: {
			text: "CO2 at my Arduino and Raspberry Pi"
		},
		axisX: {
			title: "time"
		},
		axisY: {
			title: "ppm (parts per million)"
		},
		data:
			[
				{
					type: "scatter",
					dataPoints: dps
				}
			]
	});

var chartL = new CanvasJS.Chart("chartContainer2",
	{
		title: {
			text: "Lux at my Arduino and Raspberry Pi"
		},
		axisX: {
			title: "time"
		},
		axisY: {
			title: "Lux"
		},
		data:
			[
				{
					type: "scatter",
					dataPoints: dpsL
				}
			]
	});

// var chart = new CanvasJS.Chart("chartContainer", {
// 	title:{
// 		text: "My First Chart in CanvasJS"
// 	},
// 	data: [
// 		{
// 			// Change type to "doughnut", "line", "splineArea", etc.
// 			type: "scatter",
// 			dataPoints: dps
// 		}
// 	]
// });
chart.render();
chartL.render();