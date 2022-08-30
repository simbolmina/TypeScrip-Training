import fs from "fs";
// import { MatchResult } from "./MatchResult";

// type MatchData = [Date, string, string, number, number, MatchResult, string];

export abstract class CvsFileReader<T> {
  //   data: string[][] = [];
  data: T[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((line: string): string[] => line.split(","))
      .map(this.mapRow);
  }
}
