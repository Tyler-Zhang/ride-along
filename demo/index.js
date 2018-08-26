var fs = require('fs');
var app = require('./firebaseConfig');
var firebase = require('firebase');
var sleep = require('sleep');

const firestoreApp = firebase.firestore();

var demoData = [];

var officerName = '';

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  officerName = allTextLines[0];
  var headers = allTextLines[1].split(',');
  var lines = [];
  for (var i=2; i<allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
    if (data.length == headers.length) {
      var tarr = [];
      for (var j=0; j<headers.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
    }
  }
  return lines;
}

var args = process.argv;

fs.readFile(args[2], function(err, data){
  if(err){
    console.log("Something went wrong reading file");
  }
  demoData = processData(data+'');
  //console.log(demoData);
  //console.log(officerName);
  //console.log(firestoreApp.collection('officers').where('name', '==', officerName));

  firestoreApp.collection('officers').where('name', '==', officerName).get().then(function(officer){
    console.log(officer._snapshot.query.path);
    //for(var i = 0; i < demoData.length; i++){
        //console.log(demoData[i]);
        //officer.set({location : new GeoPoint(demoData[i][0], demoData[i][1])}, { merge: true })
        //console.log("Updating officer location...");
        //sleep.sleep(1);
    //}
  }).catch(err => console.log(err));
});
