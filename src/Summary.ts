import { MatchData } from "./MatchData";
import { WinAnalysis } from "./analyzers/WinAnalysis";
import { htmlReport } from "./reportTargets/htmlReport";

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  static winsAnalysisWithHtmlRport(team: string): Summary {
    return new Summary(new WinAnalysis(team), new htmlReport());
  }
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}
