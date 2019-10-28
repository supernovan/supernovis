console.log(rows)
var arrt = rows.rows
console.log(arrt)
var dps = []
var n = new Date()

arrt.forEach(d => {
	var diff = (n - Date.parse(d.current))/3600000
	dps.push({label: "banan", x: diff, y: parseFloat(d.ppm)})
})
console.log(dps)
var chart = new CanvasJS.Chart("chartContainer",
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
var dps = [
	{ label: "1",  y: 10 },
	{ label: "1", y: 15  },
	{ label: "1", y: 25  },
	{ label: "1",  y: 30  },
	{ label: "1",  y: 28  }
]
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
console.log(dps)
chart.render();