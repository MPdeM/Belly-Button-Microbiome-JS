# Belly-Button-Microbiome-JS
"COOL THINGS TO DO WITH DATA" 

This project aims to build an interactive dashboard based on the research by D.Fergus and S.Council looking at the biodiversity of the microbies that populate human navels -- a fancy word for belly button. They published the results from 60 belly buttons 
http://robdunnlab.com/projects/belly-button-biodiversity/
It turns out that just a eigth of these bugs are very common and present in more than 70% of the people. If you are curious after playing with the dashboard go to the web page and read the reseach.  Worth mentioning that bugs are clasified by specific numbers. The so call operationa taxonimic units, i.e. OTU are specific for each microbial species. 

The Dashboard allows you to choose between many subject's ids. 
Once you have choosen the subject (subject's ID) it will display:

1 demographic information of the subject: ethnicity, gender,age, location, innie versus outie, and frquency of washing.

2 horizontal bar chart showing the 10 most prominent microbies of tha person (OTU - # referes to the "name" of the bug)

3 bubble chart that displays each sample .

4 a gauge chart to display the frequency of washing. 

The code was written in JS and uses D3 libraries to fetch data from a json file to build graphs using Plot.ly and  to deploy to a static html page 


Acknowledge: About the Data
Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/