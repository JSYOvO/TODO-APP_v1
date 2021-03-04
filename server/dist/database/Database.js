"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DatabaseConfig_1 = require("./DatabaseConfig");
class Mongo {
    constructor(url = DatabaseConfig_1.DB_URL) {
        this.url = url;
    }
    Connect() {
        mongoose_1.default.connect(this.url, { useNewUrlParser: true }, (e) => {
            if (e) {
                console.log(`Unable to connect ` + e);
            }
            else {
                console.log(`Connected to the database`);
            }
        });
    }
}
exports.Mongo = Mongo;
