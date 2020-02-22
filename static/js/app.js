function init() {
    // reference to the id in the html
    var selector = d3.select("#selDataset");
    d3.json("../../data/samples.json").then((data) => {
        //  populate the dropdown menu with the identifiers of all subjects 
        var sampleNames= data.names;
        sampleNames.forEach((sample) => {
            selector.append('option')
            .text(sample)
            .property('value', sample);
        })
        var sample = sampleNames [0];
        console.log(sample)
        buildMetadata(sample);
        buildCharts(sample)
    });
}
function optionChanged (sample) {
    // fetch new data every time a sample is selcted
    buildMetadata(sample);
    buildCharts(sample);

}
//  Display the information of the individual chosen from the dropmenu
function buildMetadata (sample){
    d3.json("../../data/samples.json").then((data) => {
        var metadata = data.metadata;
        
        console.log(metadata)
        var resultArray = metadata.filter(row => row.id == sample);
        console.log(resultArray)
        var result= resultArray[0];
        var metadataPanel = d3.select("#sample-metadata");
        metadataPanel.html('');
        // Display the ethnicity,gender,age, location.. on the html page
        Object.entries(result).forEach( ([key,value]) =>{
                metadataPanel.append('h6').text(`${key}  :   ${value}`)
        });


    });
}

function unpack (row,index) {return row.map(row=>row[index])}
function buildCharts(sample) {
    d3.json("../../data/samples.json").then((data)  => {
        // horizontal bar chart to display the top 10 OTUs found in that individual
        // values are sample_values and the labels are otu_labels
       
        console.log(sample)

        var samples = data.samples;
        var resultSampleArr = samples.filter(sampleObj => sampleObj.id == sample);
        var resultSample= resultSampleArr[0];
        var top10OTUs = resultSample.sample_values.slice(0,10)
        top10OTUs = top10OTUs.reverse()
        console.log (top10OTUs)
        var hoverotu_labels = resultSample.otu_labels.slice(0,10)
        hoverotu_labels=hoverotu_labels.reverse()
        var otu_numbers = resultSample.otu_ids.slice(0,10)
        otu_numbers =otu_numbers.reverse()
        var otu_labels= []
        otu_numbers.forEach((val) => {
            otu_labels.push(`OTU-${val}`)
        })
        
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
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
        };
          
          // Render the plot to the div tag with id "plot"
          Plotly.newPlot("bar", data, layout);

        // Build a Bubble Chart using the sample data  
        xvalue = samples.otu_ids
        console.log(xvalue)
        var trace2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: `markers`,
        marker: {
            size: samples.sample_values,
            color: samples.sample_values,
        },
        text: samples.otu_labels
        }
    
        var data2 = [trace2];
    
        var layout = {
        xaxis: { title: 'OTU ID'}
        };
        
        Plotly.newPlot('bubble', data2, layout);

    })

    
          


     

}

// Initialize the dashboard
init();

// var dropdownMenu = d3.select("#selDataset")
// d3.json("../../data/samples.json").then((data) => {
//     for (i=1; i<data.names.length; i++){
//         dropdownMenu.append('option').text(data.name[i]);
//     }
// });

