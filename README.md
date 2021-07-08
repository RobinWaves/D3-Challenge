# D3-challenge
## Data Journalism and D3 Newsroom
---

In this assignment I was tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers of a major metro newspaper understand the findings.

To enable the editor in running a series of feature stories about the health risks facing particular demographics information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System was sifted through and analyzed.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the US Census Bureau.  The current data set includes data on rates of poverty, age, income, healtcare, smoking, and obesity by state.

Inside this reposity you will find:

* D3_data_journalism - directory holding main files to run for analysis
    * index.html - main file to run
    * assets - direcory holding css, js and data files
        * css
            * d3Style.css
            * style.css
        * js
            * app.js - main file to run for analysis
        * data
            * data.csv
* images - screenshots of scatter plot

Your Task
Core Assignment: D3 Dabbler (Required Assignment)
4-scatter

You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.

Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.

Include state abbreviations in the circles.

Create and situate your axes and labels to the left and bottom of the chart.

Note: You'll need to use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser.

Bonus: Impress the Boss (Optional Assignment)
Why make a static graphic when D3 lets you interact with your data?

7-animated-scatter

1. More Data, More Dynamics
You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.
2. Incorporate d3-tip
While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the d3-tip.js plugin developed by Justin Palmer—we've already included this plugin in your assignment directory.

8-tooltip

Check out David Gotz's example to see how you should implement tooltips with d3-tip.
Assessment
Your final product will be assessed on the following metrics:

Creation of a new repository on GitHub called D3-Challenge (note the kebab-case). Do not add to an already existing repo.

Completion of all steps in the core assignment

Coherency of scatter plot (labels, ticks)

Visual attraction

Professionalism