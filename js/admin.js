document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
    loadMedia();
    setupThemeToggle();
});

// 🔹 Toggle Goal Management Section Visibility
function toggleGoalSection() {
    const goalContainer = document.getElementById("admin-goal-container");
    goalContainer.classList.toggle("hidden");
}

// 🔹 Function to Add a New Goal or Save Edits
function saveGoal() {
    const title = document.getElementById("goal-title").value.trim();
    const description = document.getElementById("goal-description").value.trim();
    const status = document.getElementById("goal-status").value;
    const progress = document.getElementById("goal-progress").value || "0";  // Default to 0%
    const goalIndex = document.getElementById("goal-index").value;  // Hidden field for editing

    if (!title || !description) {
        alert("Please enter a goal title and description.");
        return;
    }

    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    if (goalIndex === "") {
        // If no index, it's a new goal
        goals.push({ title, description, status, progress });
    } else {
        // Editing an existing goal
        goals[goalIndex] = { title, description, status, progress };
        document.getElementById("goal-index").value = "";  // Reset index field after saving
    }

    saveGoals(goals);
    resetForm();
}

// 🔹 Function to Load Goals
function loadGoals() {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    if (goals.length === 0) {
        goals = [
            { title: "Launch Website", description: "Deploy first version of the site.", status: "Achieved", progress: "100" },
            { title: "Enable User Registration", description: "Allow users to sign up.", status: "Future", progress: "0" }
        ];
        saveGoals(goals);
    }
    renderGoals(goals);
}

// 🔹 Function to Render Goals in the List
function renderGoals(goals) {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";
    goals.forEach((goal, index) => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item");
        goalElement.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p>Status: ${goal.status}</p>
            <p>Progress: ${goal.progress}%</p>
            <button onclick="editGoal(${index})">✏ Edit</button>
            <button onclick="deleteGoal(${index})">🗑 Delete</button>
        `;
        goalList.appendChild(goalElement);
    });
}

// 🔹 Function to Edit an Existing Goal
function editGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    const goal = goals[index];

    document.getElementById("goal-title").value = goal.title;
    document.getElementById("goal-description").value = goal.description;
    document.getElementById("goal-status").value = goal.status;
    document.getElementById("goal-progress").value = goal.progress;
    document.getElementById("goal-index").value = index;  // Store index for saving edits

    toggleGoalSection();  // Show the form
}

// 🔹 Function to Delete a Goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.splice(index, 1);
    saveGoals(goals);
}

// 🔹 Function to Save Goals in LocalStorage
function saveGoals(goals) {
    localStorage.setItem("goals", JSON.stringify(goals));
    loadGoals();  // Reload goal list after saving
}

// 🔹 Function to Reset Form Fields After Saving or Editing
function resetForm() {
    document.getElementById("goal-title").value = "";
    document.getElementById("goal-description").value = "";
    document.getElementById("goal-status").value = "Future";
    document.getElementById("goal-progress").value = "";
    document.getElementById("goal-index").value = "";
}

// 🔹 Manage Dark/Light Mode
function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// 🔹 Manage Media
function loadMedia() {
    fetch("media.json")
        .then(response => response.json())
        .then(media => renderMedia(media))
        .catch(error => console.error("Error loading media:", error));
}

function renderMedia(media) {
    const mediaGallery = document.getElementById("media-gallery");
    mediaGallery.innerHTML = "";
    media.forEach((file, index) => {
        const mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");
        mediaElement.innerHTML = `
            <img src="${file.url}" alt="${file.name}" width="100">
            <p>${file.name}</p>
            <button onclick="deleteMedia(${index})">🗑 Delete</button>
        `;
        mediaGallery.appendChild(mediaElement);
    });
}

function uploadMedia() {
    const fileInput = document.getElementById("media-upload");
    if (fileInput.files.length === 0) return alert("Please select a file.");

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        fetch("media.json")
            .then(response => response.json())
            .then(media => {
                media.push({ name: file.name, url: e.target.result });
                saveMedia(media);
            });
    };
    reader.readAsDataURL(file);
}

function deleteMedia(index) {
    fetch("media.json")
        .then(response => response.json())
        .then(media => {
            media.splice(index, 1);
            saveMedia(media);
        });
}

function saveMedia(media) {
    fetch("save_media.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(media)
    }).then(() => loadMedia());
}

// 🔹 Manage Dark/Light Mode
function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}
