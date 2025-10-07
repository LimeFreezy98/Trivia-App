

async function loadCategories() {
const categorySelect = document.getElementById("category");

try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();

    categorySelect.innerHTML = "";
    data.trivia_categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
        
    });
} catch (error) {
    categorySelect.innerHTML = '<option>Error loading categories</option>';
    console.error("Error fetching categories:", error);

  }
}

document.getElementById("startBtn").addEventListener("click", () => {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const type = document.getElementById("type").value;
    const amountInput = document.getElementById("amount");
    const amountError = document.getElementById("amountError");
    const amount = parseInt(amountInput.value, 10)

    amountError.style.display = "none";
     
    if (isNaN(amount) || amount < 1 || amount > 50) {
        amountError.style.display = "block";
        amountInput.focus();
        return;
    }


    const gameSettings = { 
        category,
        difficulty,
        type,
        amount
    };

    console.log("Game Settings:", gameSettings);

    localStorage.setItem("triviaSettings", JSON.stringify(gameSettings));

    alert(`Starting trivia with ${amount} questions in ${difficulty} mode!`);
      
    window.location.href = "Trivia.html";
 });


 window.onload = loadCategories;
