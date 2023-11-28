export interface Pattern {
  exclude: boolean;
  values: number[];
}

export interface PatternParserOptions {
  min?: number;
  max?: number;
  rangeSelector?: string;
}
