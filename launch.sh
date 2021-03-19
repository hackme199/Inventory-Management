#!/bin/bash

ng serve &
json-server db.json &
sleep 10;
# Store URL in a variable
URL1="http://localhost:4200/"

# Print some message
echo "** Opening $URL1 in Firefox **" ;

# Use firefox to open the URL in a new window
firefox -new-window $URL1 