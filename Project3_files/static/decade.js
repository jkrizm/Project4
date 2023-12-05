console.log("script")

let attributes=get_attribs();

  // this code will execute on page load
  // Partially adapted from Eli code
function init(){
  d3.json("/api/by_decade").then(function(data) {
    for(let x of data) {
      d3.select("#selDataset").append("option").attr("value", x.decade).text(x.decade)
    }
   
    for (attrib of attributes){
      histoplots(data[0].decade, attrib)
    };

  });
};



function get_attribs(){
  let atbs=[];
  d3.json("/api/by_attribs").then(function(data){
    for (let a of data){
      atbs.push(a.name);
    };
    console.log(atbs.length)
    // return attributes;
    attributes = atbs;
    console.log(attributes)
    return attributes;
  })
  
}


// Plot the histograms

function histoplots(myValue, attrib){

d3.json("/api/all_data").then(function(data) {
// Get the data for decade of interest
let dec_songs=[];
for (x of data) {
  if (x["decade"] == myValue)
  dec_songs.push(x)
};
// Slice for plotting
let slicedData = dec_songs.slice(0, 200);
// Reverse the array to accommodate Plotly's defaults
slicedData.reverse();
// Trace1 for the Data. make the graph horizontal with the largest category at the top
let trace1 = {
  x: slicedData.map(object => object[attrib]),
  autobinx: false,
  histnorm: "count",
  
  marker: {
    color: "rgb(30, 215, 93)",
     line: {
      color:  "rgb(0, 0, 0)",
      width: 1
    }
  },
  opacity: 1,
  type: "histogram",
};
// Data array
let data1 = [trace1];
// Apply the layout
let layout = {
title: {
  text: myValue.toString() +"'s " +attrib,
  xanchor: "center",
  font:{
    color: "white",
  },
},
plot_bgcolor:"black",
paper_bgcolor:"black",
width:250,
height: 300,
margin: {
  l: 50,
  r: 50,
  t: 50,
  b: 50,
},
xaxis: {
  color: 'white'
},
yaxis: {
  color: 'white'
}};
// Render the plot to the div tag with id "plot"
Plotly.newPlot(attrib, data1, layout);
});
};


function optionChanged(myValue){
  console.log(myValue)
  
  for (attrib of attributes){
    histoplots(myValue, attrib)
  };
  
};
init();

