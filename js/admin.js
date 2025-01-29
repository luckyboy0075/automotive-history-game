
document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
    setupTabs();
});

// Tab Navigation Logic - Ensure Correct Switching
function setupTabs() {
    const tabs = document.querySelectorAll(".admin-tabs button");
    const sections = document.querySelectorAll(".admin-section");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            sections.forEach(section => section.classList.remove("active"));
            document.getElementById(tab.getAttribute("data-target")).classList.add("active");
        });
    });
}

// Load Goals from JSON
function loadGoals() {
    fetch("goals.json")
        .then(response => response.json())
        .then(data => renderAdminGoals(data))
        .catch(error => console.error("Error loading goals:", error));
}

// Render Goal Management UI
function renderAdminGoals(goals) {
    const adminContainer = document.getElementById("admin-goals");
    adminContainer.innerHTML = "";

    goals.forEach((goal, index) => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item");

        goalElement.innerHTML = `
            <label>Goal Name:</label>
            <input type="text" value="${goal.title}" id="title-${index}" placeholder="Enter goal name">

            <label>Goal Description:</label>
            <textarea id="description-${index}" placeholder="Enter goal description">${goal.description}</textarea>

            <label>Status:</label>
            <select id="status-${index}" onchange="toggleProgressInput(${index})">
                <option value="Future" ${goal.status === "Future" ? "selected" : ""}>Future</option>
                <option value="In Progress" ${goal.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Achieved" ${goal.status === "Achieved" ? "selected" : ""}>Achieved</option>
            </select>

            <div id="progress-container-${index}" ${goal.status === "In Progress" ? "" : 'style="display:none;"'}>
                <label>Progress (%):</label>
                <input type="number" value="${goal.progress || 0}" id="progress-${index}" min="0" max="100">
            </div>

            <label>Goal Image:</label>
            <input type="file" id="image-${index}" accept="image/*">

            <button onclick="updateGoal(${index})">Save</button>
            <button onclick="deleteGoal(${index})">Delete</button>
        `;

        adminContainer.appendChild(goalElement);
    });
}

// Toggle Progress Input Visibility for "In Progress" Goals
function toggleProgressInput(index) {
    const status = document.getElementById(`status-${index}`).value;
    const progressContainer = document.getElementById(`progress-container-${index}`);
    progressContainer.style.display = status === "In Progress" ? "block" : "none";
}

// Add New Goal to CMS - FIXED
function addNewGoal() {
    const title = document.getElementById("goal-title").value.trim();
    const description = document.getElementById("goal-description").value.trim();
    const status = document.getElementById("goal-status").value;
    const progress = status === "In Progress" ? document.getElementById("goal-progress").value : 0;

    if (!title || !description) {
        alert("Goal Name and Description are required.");
        return;
    }

    fetch("goals.json")
        .then(response => response.json())
        .then(goals => {
            const newGoal = {
                title: title,
                description: description,
                status: status,
                progress: progress,
                image: ""
            };
            goals.push(newGoal);
            saveGoals(goals);
            showPopup();
        })
        .catch(error => console.error("Error adding new goal:", error));
}

// Update Existing Goal
function updateGoal(index) {
    fetch("goals.json")
        .then(response => response.json())
        .then(goals => {
            goals[index].title = document.getElementById(`title-${index}`).value;
            goals[index].description = document.getElementById(`description-${index}`).value;
            goals[index].status = document.getElementById(`status-${index}`).value;
            if (goals[index].status === "In Progress") {
                goals[index].progress = document.getElementById(`progress-${index}`).value;
            }
            saveGoals(goals);
        });
}

// Delete Goal
function deleteGoal(index) {
    fetch("goals.json")
        .then(response => response.json())
        .then(goals => {
            goals.splice(index, 1);
            saveGoals(goals);
        });
}

// Save Goals to JSON File and Update Goals Page
function saveGoals(goals) {
    fetch("save_goals.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goals)
    }).then(() => {
        loadGoals();
        updateGoalsPage(); // Ensure new goal is reflected on goals.html
    });
}

// Function to Update `goals.html` After Adding a New Goal
function updateGoalsPage() {
    fetch("goals.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("goalsData", JSON.stringify(data)); // Store data for goals.html
            window.location.href = "goals.html"; // Redirect to goals.html after adding
        })
        .catch(error => console.error("Error updating goals page:", error));
}
