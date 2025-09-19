

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
    const diffcultiy = document.getElementById("difficulty").value;
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;

    const gameSettings = { 
        category,
        diffcultiy,
        type,
        amount
    };

    console.log("Game Settings:", gameSettings);

    alert(`Starting trivia with ${amount} questions in ${difficulty} mode!`);
 
 });


 window.onload = loadCategories;
