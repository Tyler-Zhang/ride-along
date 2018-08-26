import * as fs from 'fs';
import firebase from 'firebase';
import app from './config/firebaseConfig';
const argv = require('minimist')(process.argv.slice(2));

const officerName: string | undefined = argv.n;
const fileName: string | undefined = argv.f;
let timeout = 3000;

if (argv.t) {
  timeout = Number(argv.t);
}

if (!officerName || !fileName) {
  throw new Error('Need to provide a name -n and a file -f');
}

const file = fs.readFileSync(fileName).toString().split('\n').filter(v => !!v);
const firestore = app.firestore()

async function run() {
  const officerQuery = await firestore.collection('officers').where('name', '==', officerName).get();

  const officerRef = officerQuery.docs[0].ref;

  let idx = 0;

  setInterval(() => {
    let coordinates = file[idx % file.length];
    idx ++;

    let [long, lat] = coordinates.split(',');
    
    officerRef.update({
      location: new firebase.firestore.GeoPoint(Number(lat), Number(long))
    });
  }, timeout);
}

run();
