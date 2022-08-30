import fs from "fs";

export class CvsFileReader {
  //   data: string[][] = [];
  data: string[][] = [];

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((line: string): string[] => line.split(","));
  }
}
