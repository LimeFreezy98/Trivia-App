 
let questions = [];

async function loadQuestions(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      questions = data.results;
      return questions; // return for testing
    } catch (err) {
      console.error("Error fetching questions:", err);
      throw err;
    }
  }
  
  export { loadQuestions, questions };