
document.addEventListener("DOMContentLoaded", function () {
    fetch("goals.json")
        .then(response => response.json())
        .then(data => renderGoals(data))
        .catch(error => console.error("Error loading goals:", error));
});

function renderGoals(goals) {
    const futureContainer = document.getElementById("future-goals");
    const inProgressContainer = document.getElementById("in-progress-goals");
    const achievedContainer = document.getElementById("achieved-goals");

    futureContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    achievedContainer.innerHTML = "";

    goals.forEach(goal => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-tile");

        goalElement.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            ${goal.status === "In Progress" ? `<div class="progress-bar-container"><div class="progress-bar" style="width: ${goal.progress}%;"></div></div>` : `<p>Status: ${goal.status}</p>`}
        `;

        if (goal.status === "Future") {
            futureContainer.appendChild(goalElement);
        } else if (goal.status === "In Progress") {
            inProgressContainer.appendChild(goalElement);
        } else {
            achievedContainer.appendChild(goalElement);
        }
    });
}
