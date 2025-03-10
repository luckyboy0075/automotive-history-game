document.addEventListener("DOMContentLoaded", function () {
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

async function loadGoals() {
    const response = await fetch("/content/goals/goals.json");
    const goals = await response.json();

    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

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
            <p><strong>Status:</strong> ${goal.status}</p>
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

// 🔹 Ensure Goals Load on Page Reload
window.addEventListener("load", function () {
    loadGoals();
});
