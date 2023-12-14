# Project4
For the final project, group 6 decided to build off the third projects’ findings. In the third project, some of the team members had created a webpage to analyze playlists that were representative of the most played songs in 6 decades. In that project, they:
Created a Spotify account they could use to gather data from [Spotify's Web API](https://developer.spotify.com/documentation/web-api). That gave them the client ID and client secret that they could use to get their access token (using cURL command).
Used cURL (with help from Mark and Paveen) to retrieve the following playlists (playlist ID's found through Spotify)
All Out 50s
All Out 60s
All out 70s
All out 80s
All out 90s
All out 00s
Converted data to a SQLite database.
Created an app to connect the SQLite DB (SpotifyDB) to the javascript and html. The routes include rendering the pages for the homepage, by decade, and by musical feature (aka, attribute), a route that pulls all the data, one that pulls the distinct decade, and one that pulls the different musical features.
Created 3 javascript files, which linked to 3 html pages (1 js to 1 html), and one css style sheet that is connected to all html pages.
A homepage displaying a musical attribute dropdown, that when selected, populates ranges on a slider. The slider code was adapted from basic code on the W3schools website. Moving the slider to different positions leads to the sample song for that position in the range to begin playing. Next to the slider, the album cover, artist, and song name appear. While above the slider, the attribute and the value corresponding to the sample song appear. The definition that corresponds to the attribute becomes spotify green. There are also start and stop buttons to control the music manually.
The By Decade page displayed histograms for each attribute within a decade, selected from a dropdown.
The By Musical Feature page displayed a line plot with error bars to see how the mean and variance of a given musical feature changes across the decades.
 

For the concluding phase of our project, our objectives are as follows:

1. Enhance the efficiency of the existing code on the preceding page.
2. Develop new pages to augment the overall functionality of the website.
3. Conduct a comprehensive analysis of attribute variability among songs released in the same year or decade by Spotify.
4. Analyze if there is significant correlation between decade and song attributes.
5. Employ machine learning techniques to predict, based on selected songs' musical attributes, potential categories such the decade of likely release.
6. To fulfill these objectives, we plan to utilize advanced methodologies, including but not limited to:

cURL API
JS library howler
HTML/CSS
Python Pandas
Python Matplotlib
JavaScript Plotly
SQL Database or Google Cloud SQL
Tableau
Our project drew from over 1000 songs in order to refine the model. 

