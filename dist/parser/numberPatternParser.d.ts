import { PatternParserOptions } from "../index.d.js";
export interface InternalPatternParserOptions {
    min: number;
    max: number;
    rangeSelector: string;
}
export default function numberPatternParser(patternString: string, options?: PatternParserOptions): number[];
