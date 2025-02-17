const DEFAULT_PATTERN_PARSER_OPTIONS = {
    min: 0,
    max: 10,
    rangeSelector: ":",
    output: "number",
};
function parsePattern(patternString, options) {
    const pattern = {
        exclude: false,
        values: [],
    };
    if (patternString.startsWith("!")) {
        pattern.exclude = true;
        patternString = patternString.substring(1).trim();
    }
    const patternParts = patternString.split(options.rangeSelector);
    if (patternParts.length === 2) {
        let start = parseInt(patternParts[0]);
        let end = parseInt(patternParts[1]);
        if (start > end) {
            const temp = start;
            start = end;
            end = temp;
        }
        for (let i = start; i <= end; i++) {
            if (i >= options.min && i <= options.max) {
                pattern.values.push(i);
            }
        }
    }
    else if (patternString.startsWith(">=")) {
        const value = parseInt(patternString.substring(2));
        for (let i = value; i <= options.max; i++) {
            pattern.values.push(i);
        }
    }
    else if (patternString.startsWith("<=")) {
        const value = parseInt(patternString.substring(2));
        for (let i = options.min; i <= value; i++) {
            pattern.values.push(i);
        }
    }
    else if (patternString.startsWith(">")) {
        const value = parseInt(patternString.substring(1));
        for (let i = value + 1; i <= options.max; i++) {
            pattern.values.push(i);
        }
    }
    else if (patternString.startsWith("<")) {
        const value = parseInt(patternString.substring(1));
        for (let i = options.min; i < value; i++) {
            pattern.values.push(i);
        }
    }
    else if (patternString.startsWith("%")) {
        const value = parseInt(patternString.substring(1));
        for (let i = options.min; i <= options.max; i++) {
            if (i % value === 0) {
                pattern.values.push(i);
            }
        }
    }
    else {
        const value = parseInt(patternString);
        if (value >= options.min && value <= options.max) {
            pattern.values.push(value);
        }
    }
    return pattern;
}
export default function numberPatternParser(patternString, options = DEFAULT_PATTERN_PARSER_OPTIONS) {
    const finalOptions = {
        ...DEFAULT_PATTERN_PARSER_OPTIONS,
        ...options,
    };
    patternString = patternString.replace(/\s/g, "");
    const patternStrings = patternString.split(",");
    const patterns = patternStrings.map((patternString) => parsePattern(patternString, finalOptions));
    const exclusionPatterns = patterns.filter((pattern) => pattern.exclude);
    const inclusionPatterns = patterns.filter((pattern) => !pattern.exclude);
    let numbers = [];
    if (inclusionPatterns.length === 0) {
        for (let i = finalOptions.min; i <= finalOptions.max; i++) {
            numbers.push(i);
        }
    }
    else {
        inclusionPatterns.forEach((pattern) => {
            numbers.push(...pattern.values);
        });
    }
    exclusionPatterns.forEach((pattern) => {
        numbers = numbers.filter((number) => !pattern.values.includes(number));
    });
    if (finalOptions.output === "string") {
        const stringNumbers = numbers.map((number) => number.toString());
        return Array.from(new Set(stringNumbers)).sort((a, b) => Number(a) - Number(b));
    }
    return Array.from(new Set(numbers)).sort((a, b) => a - b);
}
