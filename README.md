# Number Pattern Selector (NPS)

[![npm version](https://img.shields.io/npm/v/number-pattern-selector.svg?style=flat-square)](https://www.npmjs.org/package/number-pattern-selector)

NPS is a standardized number selector pattern. It allows for returning numbers based on a String pattern.

## Usage

TODO: Write how to use the functions

## Sample Use Cases

### Table Row/Array Index Selection

NPS allows end-users to type in specific formats to quickly select rows in a table. This could be useful for users who heavily rely on keyboards for data selection and entry.

Imagine a user needs to quickly select all but 1 index in an array with 1000 indices. It is much easier for them to type "!0" to exclude the first row then it would be to select all 1000 indices. Likewise, selecting only even rows is a pain but typing "%2" is not.

### Developer Shortcuts

If you as a developer wanted to make a button on the frontend that selected all even indices, using this package can help cut down on development time.

## Pattern Standards

Number Patterns are created with a mix of integers and operators. In most cases the operator is in front of the integer.

### Pattern Operators

| Operator | Description              | Example                      |
| -------- | ------------------------ | ---------------------------- |
| :        | Range                    | 1:5 => [1, 2, 3, 4, 5]       |
| >        | Greater Than             | >5 => [6, 7, 8, 9...]        |
| >=       | Greater Than or Equal to | >5 => [5, 6, 7, 8, 9...]     |
| <        | Less Than                | <3 => [0, 1, 2]              |
| <=       | Less Than or Equal to    | <=3 => [0, 1, 2, 3]          |
| %        | Modulo                   | %2 => [0, 2, 4, 6, 8, 10...] |


### Inclusion Single Patterns

Patterns can contain just an integer or an integer-selector combination. A minimum and maximum number must be set to avoid Infinity.

-------------

#### Single Number

A single integer is provided and returned.

Valid Patterns: `2`, `!2`
Invalid Patterns: `A`

Returns:
"2" returns `[2]`
"4" returns `[4]`
"!2" returns all numbers between the min and max except `[2]`

-------------

#### Range

Two numbers are provided seperated by a colon ":". Range cannot contain any other operators, only integers and "not"

Valid Patterns: `2:4`, `!2:4`
Invalid Patterns: `2:!4`, `>2:4`

Returns:
"2:4" returns `[2, 3, 4]`
"!2:4" returns all numbers between the min and max except `[2, 3, 4]`

-------------

#### Modulo

A percentage sign (modulo) prefixes an integer. This returns numbers divisible by the given integer.

Valid Patterns: `%2`, `!%2`
Invalid Pattern: `2%`

Returns:
"%2" returns all integers divisible by 2 `[2, 4, 6, 8...]`
"!%2" returns all integers not divisible by 2 `[1, 3, 5, 7...]`

-------------

#### Greater Than

A greater than symbol prefixes an integer. This returns all numbers after the integer provided until the max

Valid Patterns: `>2`, `!>2`
Invalid Pattern: `2>`

Returns:
">2" returns all integers after 2 `[3, 4, 5, 6...]`
"!>2" returns all integers before and including 2 `[0, 1, 2]`

-------------

#### Greater Than or Equal to

A greater than and equal symbol prefixes an integer. This returns all numbers after including the integer provided

Valid Patterns: `>=2`, `!>=2`
Invalid Pattern: `>2=`, `2>=`

Returns:
">=2" returns all integers after and including 2 `[2, 3, 4, 5, 6...]`
"!>=2" returns all integers before 2 `[0, 1]`

-------------

#### Less Than

A less than symbol prefixes an integer. This returns all numbers before the integer provided until the min value

Valid Patterns: `<2`, `!<2`
Invalid Pattern: `2<`

Returns:
"<2" returns all integers before 2 `[0, 1]`
"!<2" returns all integers after and including 2 `[1, 2, 3, 4...]`

-------------

#### Less Than or Equal to

A less than and equal symbol prefixes an integer. This returns all integers before and including the integer provided

Valid Patterns: `<=2`, `!<=2`
Invalid Pattern: `>2=`, `2>=`

Returns:
"<=2" returns all integers before and including 2 `[0, 1, 2]`
"!<=2" returns all integers after 2 `[3, 4, 5, 6...]`

-------------

### Inclusion Multi-Patterns

Multi-patterns are created when you add a comma to your pattern. This allows for multiple single patterns to be used and interchanged with each other. There is no limit to the number of patterns that can be used.

All numbers between 1:3 and 5:7

`1:3,5:7`

[1, 2, 3, 5, 6, 7]

All Even Numbers and all numbers greater than 5

`%2,>5`

[6, 8, 10, 12, 14...]

### Exclusion Pattern

Any pattern may have an exclamation point `!` in front of it. This indicates an exclusion pattern. Exclusion patterns can be mixed with Inclusive patterns.

Example:

`1:5,!3` will return `[1, 2, 4, 5]`

`>=1,!2:9,<=10` will return `[1, 10]`

`!%2` will return odd numbers `[1, 3, 5, 7, 9]`

## Contributing

Coming soon
