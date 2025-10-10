// trivia.integration.specs.js  test 

import { loadQuestions } from "../../question.js";



// test api

describe("Integration Test - loadQuestions()", () => {

     it("should fetch questions and return them", async () => {
    // Mock fetch
    global.fetch = jasmine.createSpy("fetch").and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve({
          results: [
            { question: "Q1", correct_answer: "A", incorrect_answers: ["B","C","D"] }
          ]
        })
      })
    );

    const result = await loadQuestions();

    expect(global.fetch).toHaveBeenCalled();
    expect(result.length).toBe(1);
    expect(result[0].question).toBe("Q1");
  });

  it("should throw error if fetch fails", async () => {
    global.fetch = jasmine.createSpy("fetch").and.returnValue(
      Promise.reject("Network Error")
    );

    await expectAsync(loadQuestions()).toBeRejectedWith("Network Error");
  });
});