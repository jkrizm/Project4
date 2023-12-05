console.log("script")


  // this code will execute on page load
  // Partially adapted from Eli code
function init(){
  d3.json("/api/by_attribs").then(function(data){
    
    for (let attrib of data){
      d3.select("#selDataset").append("option").attr("value", attrib.name).text(attrib.name);
    };
    lineplot(data[0].name)
  });
};





// This function plots the mean +/- 1 standard error of the attribute of interest for each decade.
// It executes the following steps:
// Pull all data using the appropriate api route.
// Filter decades to get a list of the distinct decades (i.e., 1950, 1960, ... 2000)
// Calculate mean and standard error of the values for the attribute of interest (i.e., myValue) within each decade
// Using plotly, create a lineplot with error bars using the decade as the x axis, the means as the y, and the standard error as the error bars.
function lineplot(myValue){

d3.json("/api/all_data").then(function(data) {
  let difdecs = data.map(data => data["decade"]).filter((value, index, self) => self.indexOf(value) === index);
  console.log(myValue)
  let all_avgs=[];
  let all_stderrs = [];
  for (x of difdecs) {
    console.log(x)
    let blarg = data.filter(function(data){return data.decade === x} );
    let theattribute = blarg.map(function(value,index) { return value[myValue]; });
    // avg and stdev code adapted from: https://stackoverflow.com/questions/7343890/standard-deviation-javascript
    let avg = theattribute.reduce((sum, b) => sum + b, 0) / theattribute.length;
    let stdev = Math.sqrt(theattribute.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b) / theattribute.length)
    // standard error is the standard deviation divided by the square root of the sample size
    let stderr =stdev/(Math.sqrt(theattribute.length));
    all_avgs.push(avg)
    all_stderrs.push(stderr)
  };
  console.log(all_avgs)
  console.log(all_stderrs)
// Trace1 for the accoustic Data. make the graph horizontal with the largest category at the top
let trace1 =   {
    x: [1, 2, 3, 4, 5, 6],
    y: all_avgs,
    error_y: {
      type: 'data',
      array: all_stderrs,
      color: '#1ED760',
      thickness: 1.5,
      width: 3,
      opacity: 1,
      visible: true
    },
    marker: {
      color: '#1ED760'
    },
    type: 'scatter'
  };
trace = [trace1];
// Apply a title to the layout
let layout = {
title: {
  text: myValue.toString(),
  xanchor: "center",
  font:{
    color: "white",
  },
},
plot_bgcolor:"black",
paper_bgcolor:"black",
width: 650,
// height: 400,
margin: {
  l: 50,
  r: 50,
  t: 50,
  b: 50,
},

xaxis: {
  color: 'white',
  title: 'Decade',
  tickvals: [1, 2, 3, 4, 5, 6],
  ticktext: difdecs,
},
yaxis: {
  color: 'white'
}};
// Render the plot to the div tag with id "plot"
Plotly.newPlot(featureplot, trace, layout);
});
};


//Runs everytime the dropdown selection is changed
function optionChanged(myValue){
  console.log(myValue)
  
  lineplot(myValue);
  
};


init();

