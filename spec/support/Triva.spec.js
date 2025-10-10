// trivia.specs.js  test 
import { shuffleArray } from "../../helper.js";



  
  // test arrays 
  describe("shuffleArray()", () => {
    it("should return an array of the same length", () => {
      const arr = [1, 2, 3, 4];
      const result = shuffleArray([...arr]);
      expect(result.length).toBe(arr.length);
    });

    it("should contain all original elements", () => {
      const arr = [1, 2, 3, 4];
      const result = shuffleArray([...arr]);
      arr.forEach(el => expect(result).toContain(el));
    });
  });


