// Define svg width and height
var svgWidth = 960;
var svgHeight = 500;
// Set margins for scatter
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};
// Define scatter width and height (svg area - margins)
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append SVG that holds the chart
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
// Append the scatter group and shift the group by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial X and Y axis
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// ---------------------------------------- //
// X-SCALE function - update var upon click on axis label
function xScale(censusData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([ d3.min(censusData, d => d[chosenXAxis]), 
              d3.max(censusData, d => d[chosenXAxis]) ])
    .range([0, width]);
  return xLinearScale;
}
// ---------------------------------------- //
// Y-SCALE function - update var upon click on axis label
function yScale(censusData, chosenYAxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
      .domain([ 0, d3.max(censusData, d => d[chosenYAxis]) ])
      .range([height, 0]);
    return yLinearScale;
}
// ---------------------------------------- //
// X-RENDER Xaxis function - update var upon click on axis label
function renderXaxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}
// ---------------------------------------- //
// Y-RENDER Yaxis function - update var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);
//   return xAxis;
// }
// ---------------------------------------- //
// CIRCLES RENDER function - update circles group upon click on axis label
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));
  return circlesGroup;
}
// ---------------------------------------- //
// UPDATE CIRCLE TEXT - function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {
  
//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([100, 0])
//     .html(d =>{
//       return (`${d.abbr}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }


// MAIN - Get data from the CSV file and execute  
d3.csv("assets/data/data.csv").then((censusData, err) => {
  if (err) throw err;

  // Parse data - Cast as numbers
  censusData.forEach(data => {
    data.poverty = +data.poverty;
    data.age = +data.age; 
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.smokes = +data.smokes;
    data.obesity = +data.obesity;        
  });
  // Print the census data
  console.log(censusData);

  // Initial X and Y Linear Scale - call functions
  var xLinearScale = xScale(censusData, chosenXAxis);
  var yLinearScale = yScale(censusData, chosenYAxis);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis group
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  // append y axis group
  chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .classed("stateCircle", true)
// chartGroup.selectAll("text")
  // .data(censusData)
  // .enter()
  // .append("text")
  // .attr("dx", d => xLinearScale(d[chosenXAxis]))
	// .attr("dy", d => yLinearScale(d.healthcare))
  // .text(d => d.abbr)
  // .classed("stateText", true);

  // X-AXIS labels - create and append group //
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  var povertyLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");
  var ageLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");
  var incomeLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

  // Y-AXIS labels - create and append group //
  var yLabelsGroup = chartGroup.append("g")
  var healthcareLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2)) // -200
    .attr("y", 0 - margin.right) // -40
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .text("Lacks Healthcare (%)");
  var smokesLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.right - 20)
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes (%)");  
  var obesityLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.right - 40)
    .attr("value", "obesity") // value to grab for event listener
    .classed("inactive", true)
    .text("Obese (%)");  

  // updateToolTip function to render circle text
  //var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  xLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");

      if (value !== chosenXAxis) {
      // replaces chosenXAxis with value
        chosenXAxis = value;
        console.log(chosenXAxis)

        // update new xScale
        xLinearScale = xScale(censusData, chosenXAxis);
        // update x axis with transition
        xAxis = renderXaxis(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        //circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "age") {
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "income") {
          incomeLabel
            .classed("active", true)
            .classed("inactive", false);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});