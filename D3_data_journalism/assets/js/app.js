// Load data from data.csv
d3.csv("assets/data/data.csv").then(censusData => {

    // Print the census data
    console.log(censusData);

});


    // Cast the hours value to a number for each piece of tvData
//     tvData.forEach(function(data) {
//       data.hours = +data.hours;
//     });
  
//     var barSpacing = 10; // desired space between each bar
//     var scaleY = 10; // 10x scale on rect height
  
//     // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//     var barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / tvData.length;
  
//     // @TODO
//     // Create code to build the bar chart using the tvData.
//     chartGroup.selectAll(".bar")
//       .data(tvData)
//       .enter()
//       .append("rect")
//       .classed("bar", true)
//       .attr("width", d => barWidth)
//       .attr("height", d => d.hours * scaleY)
//       .attr("x", (d, i) => i * (barWidth + barSpacing))
//       .attr("y", d => chartHeight - d.hours * scaleY);
//   }).catch(function(error) {
//     console.log(error);


