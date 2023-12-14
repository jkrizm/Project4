const fname = 'static/pca_data.json';

const dataPromise = d3.json(fname);

function init() {
    d3.json(fname).then(function(data) {
        let thekeys = Object.keys(data);
        let cluster_counts = _.filter(
            thekeys,
            function( s ) { return s.indexOf( 'cluster_' ) !== -1; }
        );

        
        let clusterDropDown = d3.select("#selDataset");
        for (let cluster of cluster_counts){
            clusterDropDown.append("option").text(cluster).property("value",cluster);
        };

        document.getElementById('selDataset').selectedIndex = 2;

        
        makePlot(cluster_counts[2]);

    });
};

function makePlot(cc){
    d3.json(fname).then(function(data) {
    

        let markercolor = Object.values(data[cc]);
        let xdata = Object.values(data['PC1']);
        let ydata = Object.values(data['PC2']);
        let zdata = Object.values(data['PC3']);
        let songname = Object.values(data['song_name']);
        let artist = Object.values(data['artist']);
        let decade = Object.values(data['decade']);
        

        let all_strings = []
        songname.forEach((s, index) => {
            const d = decade[index];
            const a = artist[index];
            let tempstring = s.concat('; Artist: ', a, '; Decade ', d);
            
            all_strings.push(tempstring)});



        var trace = {
            x: xdata, 
            y: ydata, 
            z: zdata,
            mode: 'markers',
            hovertemplate:
                    '<b>Song: </b>%{text}'+
                    '<extra></extra>',
            text: all_strings,
            marker: {
                color: markercolor,
                size: 5,
                symbol: 'circle',
                reversescale: true,
                colorscale: 'Jet',
                line: {
                width: 0},
                opacity: 0.8},
            type: 'scatter3d'};
        
        var data = [trace];
        let layout = {
            title: {
              text: "3D PCA Plot",
              xanchor: "center",
              font:{
                color: "white",
              },
            },
            scene: {
                xaxis: {
                    title: {
                        text: 'PCA1',
                    },
                    color: 'white',
                },
                yaxis: {
                    title: {
                    text: 'PCA2',
                    },
                    color: 'white',
                },
                zaxis: {
                    title: {
                    text: 'PCA3',
                    },
                    color: 'white',
                },
            },
            plot_bgcolor:"black",
            paper_bgcolor:"black",
            height: 700,
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50
          }};
        Plotly.newPlot('mlplot', data, layout);
       









    });
};


function optionChanged(cc){
  
    makePlot(cc);
    
};



init();