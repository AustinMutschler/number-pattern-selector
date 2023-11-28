import { numberPatternParser } from "../index.js";

describe("numberPatternParser", () => {
  describe("single number patterns", () => {
    test("single number", () => {
      const patternString: string = "5";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([5]);
    });

    test("multiple single numbers sequential", () => {
      const patternString: string = "1,2,3";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3]);
    });

    test("multiple single numbers non-sequential", () => {
      const patternString: string = "3,2,1";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3]);
    });

    test("multiple single numbers with gaps", () => {
      const patternString: string = "1,5,10";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 5, 10]);
    });

    test("multiple single numbers with some outside of maxNumber", () => {
      const patternString: string = "1,5,15";
      const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([1, 5]);
    });

    test("multiple single numbers with all outside of maxNumber", () => {
      const patternString: string = "15,16,17";
      const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([]);
    });
  });

  describe("range number patterns", () => {
    test("normal range", () => {
      const patternString: string = "1:5";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3, 4, 5]);
    });

    test("normal range with different selector", () => {
      const patternString: string = "1-5";
      const options = { 
        min: 0,
        max: 10,
        rangeSelector: "-",
      };
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([1, 2, 3, 4, 5]);
    });

    test("negative range", () => {
      const patternString: string = "-5:-3";
      const options = {
        min: -5,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([-5, -4, -3]);
    });

    test("same number range", () => {
      const patternString: string = "5:5";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([5]);
    });

    test("range with some numbers greater than max", () => {
      const patternString: string = "9:12";
      const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([9, 10]);
    });

    test("range with all numbers greater than max", () => {
      const patternString: string = "12:15";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([]);
    });

    test("range with reverse number", () => {
      const patternString: string = "5:1";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("modulo number patterns", () => {
    test("only even numbers", () => {
      const patternString: string = "%2";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([0, 2, 4, 6, 8, 10]);
    });

    test("only odd numbers", () => {
      const patternString: string = "!%2";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 3, 5, 7, 9]);
    });
  });

  describe("greater than number patterns", () => {
    test("greater than", () => {
      const patternString: string = ">7";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([8, 9, 10]);
    });

    test("greater than with negative numbers", () => {
      const patternString: string = ">-2";
      const options = {
        min: -5,
        max: 2,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([-1, 0, 1, 2]);
    });

    test("greater than or equal to", () => {
      const patternString: string = ">=7";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([7, 8, 9, 10]);
    });

    test("greater than or equal to max", () => {
      const patternString: string = ">=10";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([10]);
    });

    test("greater than max", () => {
      const patternString: string = ">11";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([]);
    });

    test("greater than or equal to higher than max", () => {
      const patternString: string = ">=11";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([]);
    });
  });

  describe("less than number patterns", () => {
    test("less than", () => {
      const patternString: string = "<3";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([0, 1, 2]);
    });
    test("less than or equal to", () => {
      const patternString: string = "<=3";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([0, 1, 2, 3]);
    });

    test("less than or equal to min", () => {
      const patternString: string = "<=0";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([0]);
    });

    test("less than min", () => {
      const patternString: string = "<-1";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([]);
    });

    test("less than or equal to higher than max", () => {
      const patternString: string = "<=-1";
            const options = {
        min: 0,
        max: 10,
      }
      const numbers: number[] = numberPatternParser(patternString, options);
      expect(numbers).toEqual([]);
    });
  });

  describe("multi-patterns", () => {

    test("single and single", () => {
      const patternString: string = "1,4,7,8";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 4, 7, 8]);
    });

    test("range and single", () => {
      const patternString: string = "1:3,7";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3, 7]);
    });

    test("range and range", () => {
      const patternString: string = "1:3,7:9";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3, 7, 8, 9]);
    });

    test("range and greater than", () => {
      const patternString: string = "1:3,>9";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 3, 10]);
    });

    test("range and less than", () => {
      const patternString: string = "8:10,<4";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([0, 1, 2, 3, 8, 9, 10]);
    });

    test("range and less than overlapping", () => {
      const patternString: string = "1:3,<6";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("less than and greater than", () => {
      const patternString: string = "<2,>9";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([0, 1, 10]);
    });
  });

  describe("exclusion patterns", () => {
    test("range with single exclusion", () => {
      const patternString: string = "1:5,!3";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 4, 5]);
    });

    test("range with multiple exclusion", () => {
      const patternString: string = "1:5,!3,!5";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 4]);
    });

    test("range with range exclusion", () => {
      const patternString: string = "1:8,!3:5";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 6, 7, 8]);
    });
    
    test("range with range exclusion reverse", () => {
      const patternString: string = "1:8,!5:3";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 6, 7, 8]);
    });

    test("multiple ranges with single exclusion", () => {
      const patternString: string = "1:3,!3,5:6";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 2, 5, 6]);
    });

    test("range with modulo exclusion of even numbers", () => {
      const patternString: string = "1:8,!%2";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 3, 5, 7]);
    });

    test("range with modulo exclusion of even numbers with extra whitespace", () => {
      const patternString: string = "1  : 8,  ! %    2";
      const numbers: number[] = numberPatternParser(patternString);
      expect(numbers).toEqual([1, 3, 5, 7]);
    });
  });
});
