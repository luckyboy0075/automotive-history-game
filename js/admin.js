document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
    loadMedia();
    setupThemeToggle();
});

// 🔹 Function to Load Goals from LocalStorage
function loadGoals() {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    renderGoals(goals);
}

// 🔹 Function to Render Goals on the Page
function renderGoals(goals) {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

    if (goals.length === 0) {
        goalList.innerHTML = "<p>No goals added yet.</p>";
        return;
    }

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

// 🔹 Function to Add or Edit a Goal
function saveGoal() {
    const title = document.getElementById("goal-title").value.trim();
    const description = document.getElementById("goal-description").value.trim();
    const status = document.getElementById("goal-status").value;
    const progress = document.getElementById("goal-progress").value || "0";
    const goalIndex = document.getElementById("goal-index").value;

    if (!title || !description) {
        alert("Please enter a goal title and description.");
        return;
    }

    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    if (goalIndex === "") {
        goals.push({ title, description, status, progress });
    } else {
        goals[goalIndex] = { title, description, status, progress };
        document.getElementById("goal-index").value = "";
    }

    saveGoals(goals);
    resetForm();
}

// 🔹 Function to Edit a Goal
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

// 🔹 Toggle Goal Management Section Visibility
function toggleGoalSection() {
    const goalContainer = document.getElementById("admin-goal-container");
    goalContainer.classList.toggle("hidden");
}

// 🔹 Function to Delete a Goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.splice(index, 1);
    saveGoals(goals);
}

// 🔹 Function to Save Goals in LocalStorage (Replaces PHP)
function saveGoals(goals) {
    localStorage.setItem("goals", JSON.stringify(goals));
    loadGoals();

    // 🔹 Dispatch event so `goals.js` detects changes
    window.dispatchEvent(new Event("storage"));
}

// 🔹 Function to Reset the Form After Adding or Editing a Goal
function resetForm() {
    document.getElementById("goal-title").value = "";
    document.getElementById("goal-description").value = "";
    document.getElementById("goal-status").value = "Future";
    document.getElementById("goal-progress").value = "";
    document.getElementById("goal-index").value = "";
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
