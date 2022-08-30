"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CvsFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
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
            .map((line) => line.split(","));
    }
}
exports.CvsFileReader = CvsFileReader;
