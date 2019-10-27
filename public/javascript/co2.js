let rows = "{{ rows }}";
var chart = new CanvasJS.Chart("chartContainer",
	{
		title: {
			text: "CO2 at my Arduino and Raspberry Pi"
		},
		axisX:{
			title: "timeline",
			gridThickness: 2
		},
		axisY: {
			title: "CO2 PPM"
		},
		data:
			[
				{
					type: "scatter",
					dataPoints: rows
				}
			]
	});

chart.render();