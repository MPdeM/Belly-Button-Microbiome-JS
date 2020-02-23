
function buildGauge(wfreq) {
    // Enter the Washing Frequency Between 0 and 10
    value = parseFloat(wfreq) ;


    var data = [{
          domain: { x: [0, 1], y: [0, 1] },
          value: value,
          title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          
          gauge: {
              
            axis: { range: [null, 10], 
                tickwidth: 1, 
                tickcolor: "darkblue" , 
                tickmode: "array",    
                tickvals : [0,1,2,3,4,5,6,7,8,9,10],
                    
                },
            steps: [
              { range: [9, 10], color: "rgba(0,105,11,.5)" },
              { range: [8, 9], color:"rgba(10,120,22,.5)" },
              { range: [7, 8], color: "rgba(14,127,0,.5)" },
              { range: [6, 7], color: "rgba(110,154,22,.5)" },
              { range: [5, 6], color: "rgba(170,202,42,.5)" },
              { range: [4, 5], color: "rgba(202,209,95,.5)" },
              { range: [3, 4], color:  "rgba(210,206,145,.5)" },
              { range: [2, 3], color: "rgba(232,226,202,.5)" },
              { range: [1, 2], color: "rgba(240, 230,215,.5)" },
              { range: [0, 1], color: "rgba(255,255,255,0)" },
              
            ],
            
            bar: { color: "red" },
            threshold: {
              line: { color: "red", width: 10 },
              thickness: 1,
              value: value
            }  
        }       
        }];
      
      var layout = { 
          width: 500, 
          height: 500,
           
          margin: {
            l: 50,
            r: 50,
            t: 80,
            b: 50
          },
        };
                   
    Plotly.newPlot('gauge', data, layout);
}

