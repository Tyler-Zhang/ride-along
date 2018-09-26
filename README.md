# Ride along

Police officers currently communicate using radios. Radio is the absolute fastest way to
transfer information and cannot be replaced. Ride-along is a tool that aims to augment
the use of Radios by utilising NLP to parse information communicated over radios and share them
with other officers.

<a href="https://www.youtube.com/watch?v=RWZ9XXwiOLI">
  <img src="https://raw.githubusercontent.com/Tyler-Zhang/ride-along/master/demo/demo-thumbnail.png">
</a>

Click above for a demo

## Available commands

Note: Because these commands were trained using Dialogflow, they do not have to be in the
exact form listed below.

### Navigation to [officer name]

"Hey [officer name], I'm on my way."

### Status updates

"I'm going on foot"

"I'm hurt and need medical assistance"

"I'm in pursuit"

"All good now!"

### Events

"Shots fired!"

"Just saw a tall caucasion male with tatoos wearing a blue shirt"


## Technical Details

There are 3 distinct parts to this project

### 1. Client

The client is a webapp built using React, Redux, and Firebase. It's role is to listen for
updates on Firebase and display them in real time.

### 2. Radio

The radio is another webapp built using React. It's job is to listen and transform the officer's
speech using speech-to-text and Dialogflow's NLP models. It then updates the state in Firebase.

### 3. Server

The server listens to changes in Officer's position and updates any navigational routing so
they keep up to date. Navigational waypoints are calculated using Mapbox's API.
