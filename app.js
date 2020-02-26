// create dashboard that selects from a menu and buils plots using plot.ly 

function init() {
    // populate the dropmenu with ids and assign the first one as a default
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        //  populate the dropdown menu with the identifiers of all subjects 
        var sampleNames= data.names;
        sampleNames.forEach((sample) => {
            selector.append('option')
            .text(sample)
            .property('value', sample);
        })
        //  default value
        var sample = sampleNames [0];
        buildMetadata(sample);
        buildCharts(sample);
    });
}
// event listener
function optionChanged (sample) {
    // fetch new data every time a sample is selcted
    buildMetadata(sample);
    buildCharts(sample);
 }

 //  Display the information of the individual chosen from the dropmenu
function buildMetadata (sample){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(row => row.id == sample);
        var result= resultArray[0];
        var metadataPanel = d3.select("#sample-metadata");
        metadataPanel.html('');
        // Display the ethnicity,gender,age,bely type and wash freq on the html page
        Object.entries(result).forEach( ([key,value]) =>{
                metadataPanel.append('h6').text(`${key}  :   ${value}`)
        });
        // fetch the wash freq and transfers to the "bonus.js " file 
        buildGauge(result.wfreq)
    });
}


function buildCharts(sample) {
    d3.json("samples.json").then((data)  => {
        // horizontal bar chart to display the top 10 OTUs found in that individual
        // values are sample_values and the labels are otu_labels
        var samples = data.samples;
        var resultSampleArr = samples.filter(row => row.id == sample);
        var resultSample= resultSampleArr[0];
        // the  reverse is a Plotly requirement
        var top10OTUs = resultSample.sample_values.slice(0,10).reverse()
        var hoverotu_labels = resultSample.otu_labels.slice(0,10).reverse()
        var otu_numbers = resultSample.otu_ids.slice(0,10).reverse()
        var otu_labels = []
        otu_labels= otu_numbers.forEach((val) => {otu_labels.push(`OTU-${val}`)})
         
        var trace1 = {
            x: top10OTUs,
            y: otu_labels,
            text: hoverotu_labels,
            type: "bar",
            orientation: "h"
        };
          // data
        var data = [trace1]
          // Apply the group bar mode to the layout
        var layout = {
            title: `Top 10 Microbial Species from ${sample}`,
            xaxis: { title: "value" },
            yaxis: { title: "OTU ID"},
            margin: {
              l: 50,
              r: 50,
              t: 80,
              b: 50
            }
        };
          // Render the plot to the div tag with id "plot"
          Plotly.newPlot("bar", data, layout);

        // Build a Bubble Chart using the sample data  
        var trace2 = {
        x: resultSample.otu_ids,
        y: resultSample.sample_values,
        mode: `markers`,
        marker: {
            size: resultSample.sample_values,
            color: resultSample.otu_ids,
            colorscale:"Earth"
        },
        text: resultSample.otu_labels
        }
    
        var data2 = [trace2];
    
        var layout = {
            title: 'Bacteria Culture Per Sample',
            hovermode:'closest',
            xaxis: { title: 'OTU ID'}
        };
        
        Plotly.newPlot("bubble", data2, layout);
    })
    
}

// Initialize the dashboard
init();


