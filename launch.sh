#!/bin/bash

trap "kill 0" EXIT

ng serve &
json-server db.json &
sleep 15;
# Store URL in a variable
URL1="http://localhost:4200/"

# Print some message
echo "** Opening $URL1 in Firefox **" ;

# Use firefox to open the URL in a new window
firefox -new-window $URL1 

wait
