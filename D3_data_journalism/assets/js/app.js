// Define svg width and height
var svgWidth = 1200;
var svgHeight = 800;

// Set margins for scatter
var margin = {
    top: 20,
    right: 40,
    bottom: 90,
    left: 100
};
// Define scatter width and height (svg area - margins)
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append SVG that holds the chart
// https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
var svg = d3.select("#scatter")
    .append("svg")
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
    //.attr("width", svgWidth)
    //.attr("height", svgHeight);
// Append the scatter group and shift the group by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial X and Y axis
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

//--- X-SCALE function - updates xScale upon axis change ---//
function xScale(censusData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([ d3.min(censusData, d => d[chosenXAxis] - (d[chosenXAxis] * .05)), 
              d3.max(censusData, d => d[chosenXAxis] * 1.05 ) ])
    .range([0, width]);
  return xLinearScale;
}
//--- Y-SCALE function - updates yScale upon axis change ---//
function yScale(censusData, chosenYAxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
      .domain([ d3.min(censusData, d => d[chosenYAxis] - 2),
                d3.max(censusData, d => d[chosenYAxis]) + 2 ])
      .range([height, 0]);
    return yLinearScale;
}
//--- X-AXIS RENDER function - updates bottom axis upon axis change ---//
function renderXaxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}
//--- Y-AXIS RENDER function - updates left axis upon axis change ---//
function renderYaxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
}
//--- X CIRCLES RENDER function - updates circles group upon axis change ---//
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));
  return circlesGroup;
}
//--- Y CIRCLES RENDER function - updates circles group upon axis change ---//
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));
  return circlesGroup;
}
//--- X RENDER CIRCLES TEXT function - updates circle text group upon axis change ---//
function renderXtext(circlesText, newXScale, chosenXAxis) {
  circlesText.transition()
    .duration(1000)
    .attr("dx", d => newXScale(d[chosenXAxis]));
  return circlesText;
}
//--- Y RENDER CIRCLES TEXT function - updates circle text group upon axis change ---//
function renderYtext(circlesText, newYScale, chosenYAxis) {
  circlesText.transition()
    .duration(1000)
    .attr("dy", d => newYScale(d[chosenYAxis] - .30));
  return circlesText;
}
//--- TOOLTIP function - updates circles group with new tooltip ---//
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    var xlabel;
    if (chosenXAxis === "poverty") {
      xlabel = "Poverty: ";
    }
    else if (chosenXAxis === "age") {
      xlabel = "Age: ";
    }
    else {
      xlabel = "Income ";
    }

    var ylabel;
    if (chosenYAxis === "healthcare") {
      ylabel = "Healthcare: ";
    }
    else if (chosenYAxis === "smokes") {
      ylabel = "Smokes: ";
    }
    else {
      ylabel = "Obesity: ";
    }

    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([70, 75])
    .html(function(d) {
      if (chosenXAxis === "age") { // age years and all y axis %
        return (`${d.state}<br>${xlabel} ${d[chosenXAxis]} years<br>${ylabel} ${d[chosenYAxis]}%`); 
      }
      else if (chosenXAxis === "income") { // income $ and all y axis %
        return (`${d.state}<br>${xlabel} $${d[chosenXAxis]}<br>${ylabel} ${d[chosenYAxis]}%`); 
      }
      else { // poverty % and all y axis %
        return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}%<br>${ylabel} ${d[chosenYAxis]}%`); 
      }
    });
    
    circlesGroup.call(toolTip);

    circlesGroup
      .on("mouseover", function(data) {
        toolTip.show(data, this);
        d3.select(this)
          .style("stroke", "black")
          .style("stroke-width", 2)
          .style("opacity", 1)
      })
      .on("mouseout", function(data, index) {
        toolTip.hide(data, this);
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", .6)
      });
    return circlesGroup;
  }

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

  // Initial bottom and left axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append x axis group
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  // Append y axis group
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);
    
  // Append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 18)
    .style("opacity", .6)
    //.text(d => d.abbr)
    .classed("stateCircle", true)

  // Append initial circles text
  var circlesText = chartGroup.append("g")
    .selectAll("text")
    .data(censusData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d[chosenXAxis]))
    .attr("dy", d => yLinearScale(d[chosenYAxis] - .30))  
    .classed("stateText", true);
  
  // X axis labels - create and append group
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  var povertyLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 22)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");
  var ageLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 42)
    .attr("value", "age") // value to grab for event listener 
    .classed("inactive", true)
    .text("Age (Median)");
  var incomeLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 62)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

  // Y axis labels - create and append group
  var yLabelsGroup = chartGroup.append("g")
  var healthcareLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2)) 
    .attr("y", 0 - margin.right) 
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
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // X-AXIS EVENT LISTENER
  xLabelsGroup.selectAll("text").on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");

    if (value !== chosenXAxis) {
      chosenXAxis = value;
      console.log(chosenXAxis)
      // update xScale
      xLinearScale = xScale(censusData, chosenXAxis);
      // update x axis 
      xAxis = renderXaxis(xLinearScale, xAxis);
      // update circles with new x values
      circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);
      // update circles text with new x values
      circlesText = renderXtext(circlesText, xLinearScale, chosenXAxis);
      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    }
    // changes x-axis classes to bold text
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
  });
  // Y-AXIS EVENT LISTENER
  yLabelsGroup.selectAll("text").on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");

    if (value !== chosenYAxis) {
      chosenYAxis = value;
      console.log(chosenYAxis)
      // update xScale
      yLinearScale = yScale(censusData, chosenYAxis);
      // update y axis
      yAxis = renderYaxis(yLinearScale, yAxis);
      // update circles with new y values
      circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
      // update circle text with new y values
      circlesText = renderYtext(circlesText, yLinearScale, chosenYAxis);
      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    }
    // changes y-axis classes to bold text
    if (chosenYAxis === "smokes") {
      smokesLabel
        .classed("active", true)
        .classed("inactive", false);
      healthcareLabel
        .classed("active", false)
        .classed("inactive", true);
      obesityLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else if (chosenYAxis === "obesity") {
      obesityLabel
        .classed("active", true)
        .classed("inactive", false);
      healthcareLabel
        .classed("active", false)
        .classed("inactive", true);
      smokesLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else {
      healthcareLabel
        .classed("active", true)
        .classed("inactive", false);
      smokesLabel
        .classed("active", false)
        .classed("inactive", true);
      obesityLabel
        .classed("active", false)
        .classed("inactive", true);
    }
  });
  

}).catch(function(error) {
  console.log(error);
});  