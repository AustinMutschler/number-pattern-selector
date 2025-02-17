import { Pattern, PatternParserOptions } from "../index.d.js";

export interface InternalPatternParserOptions {
  min: number;
  max: number;
  rangeSelector: string;
  output?: string;
}

const DEFAULT_PATTERN_PARSER_OPTIONS: InternalPatternParserOptions = {
  min: 0,
  max: 10,
  rangeSelector: ":",
  output: "number",
};

function parsePattern(
  patternString: string,
  options: InternalPatternParserOptions
): Pattern {
  const pattern: Pattern = {
    exclude: false,
    values: [],
  };

  // If the pattern starts with an exclamation point, it's an exclusion pattern
  if (patternString.startsWith("!")) {
    pattern.exclude = true;
    // Remove the exclamation point
    patternString = patternString.substring(1).trim();
  }

  // Split the pattern string by dashes
  const patternParts = patternString.split(options.rangeSelector);

  // If there are two parts, the pattern is a range
  if (patternParts.length === 2) {
    let start = parseInt(patternParts[0]);
    let end = parseInt(patternParts[1]);

    // Allow for revers if start is greater than end
    // Example: 5-1 -> 1-5
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }

    // Adds all numbers in the range to the value "1-5" -> [1, 2, 3, 4, 5]
    for (let i = start; i <= end; i++) {
      if (i >= options.min && i <= options.max) {
        pattern.values.push(i);
      }
    }
  }
  // Greater than or equal to pattern matches all numbers greater than or equal to the given number and less than or equal to the max number
  // Example: max=10 pattern=">=5" -> [5, 6, 7, 8, 9, 10]
  else if (patternString.startsWith(">=")) {
    // Remove the ">=" from the pattern string
    const value = parseInt(patternString.substring(2));
    for (let i = value; i <= options.max; i++) {
      pattern.values.push(i);
    }
  }
  // Less than or equal to pattern matches all numbers less than or equal to the given number and greater than or equal to the min number
  // Example: min=1 pattern="<=5" -> [1, 2, 3, 4, 5]
  else if (patternString.startsWith("<=")) {
    // Remove the "<=" from the pattern string
    const value = parseInt(patternString.substring(2));
    for (let i = options.min; i <= value; i++) {
      pattern.values.push(i);
    }
  }
  // Greater than pattern matches all numbers greater than the given number and less than or equal to the max number
  // Example: max=10 pattern=">5" -> [6, 7, 8, 9, 10]
  else if (patternString.startsWith(">")) {
    // Remove the ">" from the pattern string
    const value = parseInt(patternString.substring(1));
    for (let i = value + 1; i <= options.max; i++) {
      pattern.values.push(i);
    }
  }
  // Less than pattern matches all numbers less than the given number and greater than or equal to the min number
  // Example: min=1 pattern="<5" -> [1, 2, 3, 4]
  else if (patternString.startsWith("<")) {
    // Remove the "<" from the pattern string
    const value = parseInt(patternString.substring(1));
    for (let i = options.min; i < value; i++) {
      pattern.values.push(i);
    }
  }
  // Modulo pattern matches all numbers that are divisible by the given number
  // Example: pattern="%2" -> [2, 4, 6, 8, 10]
  else if (patternString.startsWith("%")) {
    // Remove the "%" from the pattern string
    const value = parseInt(patternString.substring(1));
    for (let i = options.min; i <= options.max; i++) {
      if (i % value === 0) {
        pattern.values.push(i);
      }
    }
  }
  // If the pattern is just a number, add that number to the values
  // Example: pattern="5" -> [5]
  else {
    const value = parseInt(patternString);

    // Only add the value if it greater than or equal to the min number and less than or equal to the max number
    if (value >= options.min && value <= options.max) {
      pattern.values.push(value);
    }
  }
  return pattern;
}

export default function numberPatternParser(
  patternString: string,
  options: PatternParserOptions = DEFAULT_PATTERN_PARSER_OPTIONS
): number[] | string[] {
  const finalOptions: InternalPatternParserOptions = {
    ...DEFAULT_PATTERN_PARSER_OPTIONS,
    ...options,
  };
  // Normalize the pattern string
  patternString = patternString.replace(/\s/g, "");

  // Split the pattern string by commas
  const patternStrings: string[] = patternString.split(",");
  const patterns: Pattern[] = patternStrings.map((patternString) =>
    parsePattern(patternString, finalOptions)
  );
  const exclusionPatterns: Pattern[] = patterns.filter(
    (pattern) => pattern.exclude
  );
  const inclusionPatterns: Pattern[] = patterns.filter(
    (pattern) => !pattern.exclude
  );
  let numbers: number[] = [];

  // If there are no inclusion patterns, add all numbers from the min number to the max number
  if (inclusionPatterns.length === 0) {
    for (let i: number = finalOptions.min; i <= finalOptions.max; i++) {
      numbers.push(i);
    }
  }
  // Otherwise, use inclusion patterns to add numbers
  else {
    inclusionPatterns.forEach((pattern: Pattern) => {
      numbers.push(...pattern.values);
    });
  }

  // Remove numbers that are in the exclusion patterns
  exclusionPatterns.forEach((pattern: Pattern) => {
    numbers = numbers.filter((number) => !pattern.values.includes(number));
  });

  // If the output is a string, return the numbers as a string
  if (finalOptions.output === "string") {
    const stringNumbers = numbers.map((number) => number.toString());
    return Array.from(new Set(stringNumbers)).sort(
      (a: string, b: string) => Number(a) - Number(b)
    );
  }

  // Remove duplicates and sort the numbers
  return Array.from(new Set(numbers)).sort((a: number, b: number) => a - b);
}
