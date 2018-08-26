"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const firebase_1 = __importDefault(require("firebase"));
const firebaseConfig_1 = __importDefault(require("./config/firebaseConfig"));
const argv = require('minimist')(process.argv.slice(2));
const officerName = argv.n;
const fileName = argv.f;
let timeout = 3000;
if (argv.t) {
    timeout = Number(argv.t);
}
if (!officerName || !fileName) {
    throw new Error('Need to provide a name -n and a file -f');
}
const file = fs.readFileSync(fileName).toString().split('\n').filter(v => !!v);
const firestore = firebaseConfig_1.default.firestore();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const officerQuery = yield firestore.collection('officers').where('name', '==', officerName).get();
        const officerRef = officerQuery.docs[0].ref;
        let idx = 0;
        setInterval(() => {
            let coordinates = file[idx % file.length];
            idx++;
            let [long, lat] = coordinates.split(',');
            officerRef.update({
                location: new firebase_1.default.firestore.GeoPoint(Number(lat), Number(long))
            });
        }, timeout);
    });
}
run();
//# sourceMappingURL=index.js.map