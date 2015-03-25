$(function() {

		// We use an inline data source in the example, usually data would
		// be fetched from a server
		var dataset=[];
		var data=[];
		var data2=[];		
		var index=0;
		var thresholdflagged=0;
		// Set up the control widget


		
		var updateInterval = 300;
		$("#updateInterval").val(updateInterval).change(function () {
			var v = $(this).val();
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
		});
		function getData()
		{   
			var i=0;
			data[1]=0;
			data[index]=data[index-1]*0.93+5;
			data2[index]=data[index]*data2[index];
			if(data[index]>=58  && thresholdflagged==0)
			{
				alert("Threshold Value Reached");
				thresholdflagged=1;
			}
			var plotdata=[];
			while(i<index)
			{
				plotdata.push([i,data[i]]);
				i++;
			}
			console.log(plotdata);
			return plotdata;
		}
		var plot = $.plot("#placeholder", [getData()], {
			series: {
				threshold: {
					below: 58,
					color: "rgb(200, 20, 30)"
				},
				shadowSize: 0,
				animate:1	// Drawing is faster without shadows
			},
			
			xaxis: {
				min:0,
				max:100,
				zoomRange: [1,2],
				panRange: [0, 100]
			},
			yaxis: {
				min:0,
				max:100,
				zoomRange: [01, 5],
				panRange: [0, 100]
			},
			zoom: {
				interactive: true
			},
			pan: {
				interactive: true
			}
		});

		function update() {

			plot.setData([getData()]);

			plot.setupGrid();

			plot.draw();
			index++;
			if(index<600)
			{
			setTimeout(update,1000);	
			}
		}

		
		
		update();
		
		// Add the Flot version string to the footer

		
	});