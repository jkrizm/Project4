# Import the dependencies.
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

from flask import Flask, jsonify, render_template
from flask_cors import CORS



#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///SpotifyDB.sqlite")
# engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/Spotify_DB")
# reflect an existing database into a new model
Base = automap_base()



# reflect the tables
Base.prepare(autoload_with = engine)
# print(Base.classes.keys())
# Save reference to the table
spotify_data = Base.classes.spotify_data


# Create our session (link) from Python to the DB
# session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__, template_folder="")
# app = Flask(__name__)
CORS(app)


#################################################
# Flask Routes
#################################################

@app.route("/help")
def welcome():
    """List of api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/<br/>"
        f"/api/decade<br/>"
        f"/api/feature<br/>"
        f"/api/all_data<br/>"
        f"/api/by_decade<br/>"
        f"/api/by_attribs<br/>"
        
    )

# Route for the homepage
@app.route("/")
def index():
    """Render the home page"""
    return render_template('index.html')

# Route for the all attributes within decade page
@app.route("/decade")
def decade():
    """Render the by decade page"""
    return render_template('decade.html')

# Route for the one attribute across decades page
@app.route("/feature")
def feature():
    """Render the by decade page"""
    return render_template('feature.html')

# Route to gather all data from database
@app.route("/api/all_data")
def all_data():
    # Create our session (link) from Python to the DB
    # This route adapted from Eli code.
    session = Session(engine)
    

    results = [x.__dict__ for x in session.query(spotify_data)]
    for result in results:
        del result['_sa_instance_state']
    session.close()

    return jsonify(results)

#Route to return list of unique decade values from 'decade' column of table
@app.route("/api/by_decade")
def by_decade():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(spotify_data.decade).distinct().all()
    

    all_names = list(np.ravel(results))
    all_data = []
    for decade in all_names:
        name_dict = {}
        name_dict["decade"] = int(decade)
        all_data.append(name_dict)
    session.close()
    return jsonify(all_data)


# Get the musical attributes from the sql table column names
@app.route("/api/by_attribs")
def by_attribs():
    session = Session(engine)
    db_columns = Base.classes.spotify_data.__table__.columns.keys()
    attributes = []
    att_cols = db_columns[8:19]+db_columns[23:25]
    att_cols = sorted(att_cols)
    for cols in att_cols:
        col_dict = {}
        col_dict["name"] = cols
        attributes.append(col_dict)
   
    session.close()

    return jsonify(attributes)

#Run
if __name__ == '__main__':
    app.run(debug=True)
      