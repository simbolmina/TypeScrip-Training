"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CvsFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("./util");
class CvsFileReader {
    constructor(filename) {
        this.filename = filename;
        //   data: string[][] = [];
        this.data = [];
    }
    read() {
        this.data = fs_1.default
            .readFileSync(this.filename, {
            encoding: "utf-8",
        })
            .split("\n")
            .map((line) => line.split(","))
            .map((row) => {
            return [
                (0, util_1.dateStringToDate)(row[0]),
                row[1],
                row[2],
                parseInt(row[3]),
                parseInt(row[4]),
                row[5],
                //type assortion. this is one of the possible values of this enum. 'H', 'A', 'D'
                row[6],
            ];
        });
    }
}
exports.CvsFileReader = CvsFileReader;
