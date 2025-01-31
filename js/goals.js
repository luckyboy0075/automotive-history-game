document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
});

// 🔹 Function to Load and Display Goals on `goals.html`
function loadGoals() {
    const goalList = document.getElementById("goal-list");
    if (!goalList) {
        console.error("Error: Element with ID 'goal-list' not found.");
        return;
    }

    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goalList.innerHTML = "";

    if (goals.length === 0) {
        goalList.innerHTML = "<p>No goals added yet.</p>";
        return;
    }

    goals.forEach(goal => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item");
        goalElement.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p>Status: ${goal.status}</p>
            <p>Progress: ${goal.progress}%</p>
        `;
        goalList.appendChild(goalElement);
    });
}

// 🔹 Detect Changes in LocalStorage and Update Goals in Real-Time
window.addEventListener("storage", function (event) {
    if (event.key === "goals") {
        loadGoals();  // Reload the goals when changes occur
    }
});
