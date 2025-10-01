



document.addEventListener("DOMContentLoaded", () => {
    const stats = JSON.parse(localStorage.getItem("triviaStats")) || [];
    const statsTable = document.getElementById("statsTable");
    const totalGameEl = document.getElementById("totalGames");
    const avgScoreEl = document.getElementById("avgScore");
    const fastestTimeEl = document.getElementById("fastestTime");
    const totalTimeEl = document.getElementById("totalTime");



    function formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        } else if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
        } else {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            let parts = [];
            if (hrs > 0) parts.push(`${hrs}h`);
            if (mins > 0) parts.push(`${mins}m`);
            if (secs > 0) parts.push(`${secs}s`);
            return parts.join(" ");
        }
    }



//  API categories → friendly names
    const categoryMap = {
        9: "General Knowledge",
        10: "Books",
        11: "Film",
        12: "Music",
        13: "Musicals & Theatres",
        14: "Television",
        15: "Video Games",
        16: "Board Games",
        17: "Science & Nature",
        18: "Computers",
        19: "Mathematics",
        20: "Mythology",
        21: "Sports",
        22: "Geography",
        23: "History",
        24: "Politics",
        25: "Art",
        26: "Celebrities",
        27: "Animals",
        28: "Vehicles",
        29: "Comics",
        30: "Science: Gadgets",
        31: "Anime & Manga",
        32: "Cartoons & Animations"
      };

//  API difficulty → friendly names
      const difficultyMap = {
        "easy": "Easy",
        "medium": "Normal",
        "hard": "Hard",
        "any": "Any"
      };


  // API questionType → friendly names
const typeMap = {
    "multiple": "Multiple Choice",
    "boolean": "True / False",
    "any": "Any"
  };


  

// Previous Trivia table
stats.forEach((game) => {
    const friendlyCategory = categoryMap[game.category] || game.category;
    const friendlyDifficulty = difficultyMap[game.difficulty?.toLowerCase()] || game.difficulty;
    const friendlyType = typeMap[game.questionType?.toLowerCase()] || game.questionType;
    const friendlyTime = formatTime(game.time);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${game.date}</td>
      <td>${game.score} / ${game.total}</td>
      <td>${friendlyTime}</td>
      <td>${friendlyCategory}</td>
      <td>${friendlyDifficulty}</td>
      <td>${friendlyType}</td>
    `;
    statsTable.appendChild(row);
});

totalGameEl.textContent = stats.length;

if (stats.length > 0) {
    const totalScore = stats.reduce((sum, g) => sum + g.score, 0);
    const totalQuestions = stats.reduce((sum, g) => sum + g.total, 0);
    avgScoreEl.textContent = `${((totalScore / totalQuestions) * 100).toFixed(1)}%`;

    const fastest = Math.min(...stats.map(g => g.time));
    fastestTimeEl.textContent = formatTime(fastest);

    
    const totalTime = stats.reduce((sum, g) => sum + g.time, 0);
    if (totalTimeEl) {
        totalTimeEl.textContent = formatTime(totalTime);
    }
        
}

// clear stats data
document.getElementById("clearStats").addEventListener("click", () => {
    if (confirm("Are you Sure you want to clear all stats data?")) {
        localStorage.removeItem("triviaStats");
        location.reload();
    }
});
});