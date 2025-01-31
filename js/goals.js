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

// 🔹 Function to Load and Display Goals on `goals.html`
function loadGoals() {
    console.log("Loading goals...");  // Debugging log

    const goalList = document.getElementById("goals-list");
    if (!goalList) {
        console.error("Error: Element with ID 'goal-list' not found.");
        return;
    }

    // Retrieve goals from LocalStorage
    let goals = JSON.parse(localStorage.getItem("goals"));

    if (!goals || goals.length === 0) {
        console.warn("No goals found in LocalStorage. Creating a default goal.");
        goals = [
            {
                title: "Default Goal",
                description: "This is a placeholder goal. Add more goals via the Admin Panel.",
                status: "Future",
                progress: "0"
            }
        ];
        localStorage.setItem("goals", JSON.stringify(goals));  // Store default goal
    }

    goalList.innerHTML = "";

    // 🔹 Render Each Goal as a Tile with Progress Bar for "In Progress" Goals
    goals.forEach(goal => {
        console.log("Rendering goal:", goal);  // Debugging log

        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item"); // Ensure tiles have the correct class

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

    console.log("Goals loaded successfully.");  // Debugging log
}

// 🔹 Detect Changes in LocalStorage and Update Goals in Real-Time
window.addEventListener("storage", function (event) {
    if (event.key === "goals") {
        loadGoals();  // Reload goals when changes occur
    }
});
