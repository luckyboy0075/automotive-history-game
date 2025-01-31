document.addEventListener("DOMContentLoaded", function () {
    // Ensure the goals list loads only when `goal-list` exists
    waitForElement("#goal-list", loadGoals);
});

// 🔹 Function to Wait for an Element Before Running Code
function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback();
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}

// 🔹 Function to Load and Display Goals on `goals.html`
function loadGoals() {
    const goalList = document.getElementById("goal-list");
    if (!goalList) {
        console.error("Error: Element with ID 'goal-list' not found.");
        return;
    }

    // Retrieve goals from LocalStorage
    let goals = JSON.parse(localStorage.getItem("goals"));

    if (!goals) {
        console.error("No goals found in LocalStorage.");
        goals = [];
        localStorage.setItem("goals", JSON.stringify(goals));  // Ensure empty array is stored
    }

    goalList.innerHTML = "";

    if (goals.length === 0) {
        goalList.innerHTML = "<p>No goals added yet.</p>";
        return;
    }

    // 🔹 Render Each Goal as a Tile with Progress Bar for "In Progress" Goals
    goals.forEach(goal => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item");

        let progressHTML = "";
        if (goal.status === "In Progress") {
            progressHTML = `
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${goal.progress}%;"></div>
                </div>
            `;
        }

        goalElement.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p>Status: ${goal.status}</p>
            ${progressHTML}
        `;

        goalList.appendChild(goalElement);
    });
}

// 🔹 Detect Changes in LocalStorage and Update Goals in Real-Time
window.addEventListener("storage", function (event) {
    if (event.key === "goals") {
        loadGoals();  // Reload goals when changes occur
    }
});
