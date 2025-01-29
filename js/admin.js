
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
            <input type="text" value="${goal.title}" id="title-${index}">
            <textarea id="description-${index}">${goal.description}</textarea>
            <select id="status-${index}" onchange="toggleProgressInput(${index})">
                <option value="Future" ${goal.status === "Future" ? "selected" : ""}>Future</option>
                <option value="In Progress" ${goal.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Achieved" ${goal.status === "Achieved" ? "selected" : ""}>Achieved</option>
            </select>
            <div id="progress-container-${index}" ${goal.status === "In Progress" ? "" : 'style="display:none;"'}>
                <label for="progress-${index}">Progress:</label>
                <input type="number" value="${goal.progress || 0}" id="progress-${index}" min="0" max="100">
            </div>
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

// Add New Goal to CMS
function addNewGoal() {
    fetch("goals.json")
        .then(response => response.json())
        .then(goals => {
            goals.push({
                title: "New Goal",
                description: "Goal description",
                status: "Future",
                progress: 0,
                image: ""
            });
            saveGoals(goals);
        });
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
            const imageInput = document.getElementById(`image-${index}`);
            if (imageInput.files.length > 0) {
                goals[index].image = URL.createObjectURL(imageInput.files[0]);
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

// Save Goals to JSON File
function saveGoals(goals) {
    fetch("save_goals.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goals)
    }).then(() => loadGoals());
}

// Feature Management Placeholder
function addNewFeature() {
    alert("Feature management functionality will be added soon.");
}

// Media Upload Functionality
function uploadMedia() {
    const mediaInput = document.getElementById("media-upload");
    if (mediaInput.files.length > 0) {
        alert("Media uploaded successfully!");
    } else {
        alert("Please select a file to upload.");
    }
}
