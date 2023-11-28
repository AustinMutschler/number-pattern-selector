export default function validNumberPattern(pattern: string): boolean {
  // The pattern must be a string
  if (typeof pattern !== "string") {
    return false;
  }

  // The pattern may not have letters or special characters besides ",<,>,=,%,!"
  if (
    !pattern.match(
      /^(?:[<>]=?|!)?(?:-?\d+(?::-?\d+)?|%[1-9]\d*|\d+)(?:,(?:[<>]=?|!)?(?:-?\d+(?::-?\d+)?|%[1-9]\d*|\d+))*$/g
    )
  ) {
    return false;
  }
  // If the pattern contains a colon, split and loop through the values to run special check for ranges
  if (pattern.includes(":")) {
    const patternStrings: string[] = pattern.split(",");
    for (let i = 0; i < patternStrings.length; i++) {
      // If the pattern string contains a colon for range, check if the values are valid
      if (patternStrings[i].includes(":")) {
        const range: string[] = patternStrings[i].split(":");

        // If the first value in the range contains more than just a number, return false
        if (!range[0].match(/^(!)?(-)?\d+$/g) || !range[1].match(/^(!)?(-)?\d+$/g)) {
          return false;
        }
      }
    }
  }
  return true;
}
