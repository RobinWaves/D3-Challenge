# D3-challenge
## Data Journalism and D3 Newsroom
---
![Newspapers](images/newspapers.jpg)

In this assignment I was tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers of a major metro newspaper understand the findings.

 Information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System was sifted through and analyzed to enable the editor in running a series of feature stories about the health risks facing particular demographics.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the US Census Bureau.  The current data set includes data on rates of poverty, age, income, healtcare, smoking, and obesity by state.

Inside this reposity you will find:

* D3_data_journalism - directory holding main files to run for analysis
    * index.html - main file to run
    * assets - directory holding css, js and data files
        * css
            * d3Style.css
            * style.css
        * js
            * app.js - main file to run for analysis  
            Includes core assignment and bonus assignment
        * data
            * data.csv 
* images - screenshots of scatter plot and misc images needed for assignment.

Using D3 an interactive scatter plot was created with each state represented as circle elements.  On the y axis you can choose healthcare, smokers and obesity.  On the x axis you can choose poverty, age and income.  When a user selects an axis click events are used on axes lables to activate and data is displayed.  Transitions from one axis to the next are animated and the range of axes are also updated.

A D3 tool-tip is also implemented when a user hovers over the state circle.  The state and its respective values are displayed.  The circle is also increased in opacity and gets a black border when hovered.