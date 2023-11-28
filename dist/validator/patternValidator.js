export default function validNumberPattern(pattern) {
    if (typeof pattern !== "string") {
        return false;
    }
    if (!pattern.match(/^(?:[<>]=?|!)?(?:-?\d+(?::-?\d+)?|%[1-9]\d*|\d+)(?:,(?:[<>]=?|!)?(?:-?\d+(?::-?\d+)?|%[1-9]\d*|\d+))*$/g)) {
        return false;
    }
    if (pattern.includes(":")) {
        const patternStrings = pattern.split(",");
        for (let i = 0; i < patternStrings.length; i++) {
            if (patternStrings[i].includes(":")) {
                const range = patternStrings[i].split(":");
                if (!range[0].match(/^(!)?(-)?\d+$/g) || !range[1].match(/^(!)?(-)?\d+$/g)) {
                    return false;
                }
            }
        }
    }
    return true;
}
