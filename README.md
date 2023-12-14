# Project4
For the final project, group 6 decided to build off what we had developed for Project 3. In the third project, some of the team members had created a webpage to analyze playlists that were representative of the most played songs in 6 decades. The goals accomplished in that project are briefyly:
1. Created a Spotify account they could use to gather data from [Spotify's Web API](https://developer.spotify.com/documentation/web-api). That gave them the client ID and client secret that they could use to get their access token (using cURL command).
2. Used cURL (with help from Mark and Paveen) to retrieve one playlist for each decade (50s through 00s) by playlist ID.
3. Converted data to a SQLite database.
4. Created an app to connect the SQLite DB (SpotifyDB) to the javascript and html.
5. Created 3 javascript files, which linked to 3 html pages (1 js to 1 html), and one css style sheet that is connected to all html pages.

 
For Project 4, our goals were to:
1. Enhance the efficiency of the existing code.
2. Develop new pages to augment the overall functionality of the website based on data analysis and machine learning results.
3. Conduct a comprehensive analysis of attribute variability among songs released within a decade and across decades in Tableau.
4. Analyze linear and non-linear trends in the different music features over time.
5. Employ supervised machine learning to determine whether the various music features can classify songs by decade.
6. Employ unsupervised machine learning to allow data to 'self-aggregate' by music features that have gone through PCA-based dimension reduction.
7. To fulfill these objectives, we utilized the following:
* cURL commands for data retrieval from Spotify API
* JS libraries
   * howler
   * plotly
   * d3
   * underscore
* HTML/CSS
* Python Pandas
* Python Matplotlib
* SQL Database
* Tableau
   
Our project drew from over 1800 songs in order to refine the model. This is an increase of 150% of the songs used in project 3.  

# Summary
The findings from our project are summarized here: https://docs.google.com/document/d/1HYaxgifmCOVyorIK1vQNqTZM2gYwFWc6c-cpdFQxJrY/edit?usp=sharing





