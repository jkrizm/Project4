
let slider = document.getElementById("theslide");



  // this code will execute on page load
  // Init partially adapted from Eli code
function init(){
  d3.json("/api/by_attribs").then(function(data){
    
    for (let attrib of data){
      d3.select("#selDataset").append("option").attr("value", attrib.name).text(attrib.name);
    };
    document.getElementById('selDataset').selectedIndex = -1;
    document.getElementById('display_attribute').innerText = 'Select attribute then move slider to begin';
    });
    document.getElementById("theslide").setAttribute("max",5);
    document.getElementById("theslide").setAttribute("value",3);

};



// sets up the slider and explanation based on the musical attribute selected from the dropdown
function getdata(attrib_selected){
  // Sort the data and remove any that are missing image url and song clip preview url.
  d3.json("/api/all_data").then(function(data) {
    data.sort(function(a,b) {
      return a[attrib_selected]-b[attrib_selected]
  });
  pruneddata = data.filter(item => item.preview_url.length !== 0);
  pruneddata = pruneddata.filter(item => item.pic_url.length !== 0);

  //Find out how many unique values there are for the attribute of interest
  difvals = pruneddata.map(pruneddata => pruneddata[attrib_selected]).filter((value, index, self) => self.indexOf(value) === index);

  //Calculate number of slider stops and example songs to grab based on 
  //unique number of values for attribute of interest
  if (difvals.length > 4) {
    var numsegs = 5;
    var idx = [0, Math.floor((pruneddata.length+1)/4), Math.floor((pruneddata.length+1) / 2), Math.floor((pruneddata.length+1)*.75), (pruneddata.length)-1];
  } 
  else if (difvals.length > 2){
    var numsegs = 3;
    var idx = [];
    // need to do this because the data are skewed in this grouping level so can't just take the first, last, and middle of sorted array. 
    for(let d of difvals){
      idx.push(pruneddata.map(pruneddata => pruneddata[attrib_selected]).findIndex(value => value === d))
    };
    
  }
  else {
    var numsegs = 2;
    var idx = [0, (pruneddata.length)-1];
  };

  //Assign the max and starting slider stops based on the number of segments
  document.getElementById("theslide").setAttribute("max",numsegs);
  let midpt = Math.floor((numsegs+1) / 2);
  document.getElementById("theslide").setAttribute("value",midpt);
  console.log(document.getElementById("theslide"));

  //get the songs that will be used for the demonstration
  let tempdemosongs = [];
  idx.forEach(i => tempdemosongs.push(pruneddata[i]));

  
  // rename them to the global variable for use in the getval function
  demosongs = tempdemosongs;
  theattribute = attrib_selected;
  return {
    demosongs,
    theattribute}
    ;

})
};



// This function determines what music to play, album artwork to display, and attribute value
// to show under the slider based on the position of the slider.
function getval(){
  getdata.demosongs = demosongs;
  getdata.theattribute = theattribute;
  console.log(demosongs)

  thesong = demosongs[(slider.value)-1];
  let allvals= getdata.demosongs.map(function(item) { return item[theattribute]; });
  console.log(allvals);
  let output = document.getElementById("theval").innerText=allvals[(slider.value)-1];
  
  picurl = thesong["pic_url"];
  console.log(thesong)
  document.getElementById("albumcover").src = picurl;
  document.getElementById("thesong").innerText=thesong["song_name"];
  document.getElementById("theartist").innerText=thesong["artist"];
  soundurl = thesong["preview_url"];

  //Send sample url to howler function
  sound = playthatfunkymusic(soundurl);

  //get sound back from howler function and play it. 
  console.log(sound);
  sound.play()
// Update the current slider value and stop playing previous song.
  slider.oninput = function() {
    console.log(slider.value);
    sound.stop()
    output.innerHTML = this.value;
 
};
};

function stopthemusic(){
  sound.stop()
};

function startthemusic(){
  sound.play()
};


function playthatfunkymusic(soundurl){
  var sound = new Howl({
    src: [soundurl],
    format: ['mp3'],
    autoplay: false,
    loop: false,
    volume: 0.5,
  });
  console.log(sound);
  return sound;
};



function optionChanged(attrib_selected){

  console.log(attrib_selected)
  document.getElementById('display_attribute').innerText = attrib_selected;
  document.getElementById("albumcover").src ="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/232px-Spotify_icon.svg.png";
  document.getElementById("thesong").innerText="";
  document.getElementById("theartist").innerText="";
  document.getElementById("theslide").setAttribute("max",5);
  document.getElementById("theslide").setAttribute("value",3);
  document.getElementById("theval").innerText=""
  getdata(attrib_selected);
 

  d3.json("/api/by_attribs").then(function(data){
    
    for (let a of data){
      console.log(a.name)
      if (attrib_selected === a.name){
          document.getElementById(a.name).style.color = "#1ED760";
      }
    else{
        document.getElementById(a.name).style.color = "#ffffff";
      } 
    };
  });
  
};

init();