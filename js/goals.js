document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
});

// 🔹 Function to Load and Display Goals on `goals.html`
function loadGoals() {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    const goalList = document.getElementById("goal-list");
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
