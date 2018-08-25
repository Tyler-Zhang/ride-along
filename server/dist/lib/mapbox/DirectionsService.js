"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function coordinateToCsv(coord) {
    return `${coord.longitude},${coord.latitude}`;
}
class DirectionsService {
    constructor(accessToken) {
        this.BASE_URL = "https://api.mapbox.com";
        this.accessToken = accessToken;
    }
    getRoute(coordA, coordB, profile = 'driving') {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.get(`${this.BASE_URL}/directions/v5/mapbox/${profile}/${coordinateToCsv(coordA)};${coordinateToCsv(coordB)}?geometries=geojson&access_token=${this.accessToken}`);
            return result.data.routes[0].geometry;
        });
    }
}
exports.default = DirectionsService;
//# sourceMappingURL=DirectionsService.js.map