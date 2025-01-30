document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
    loadMedia();
    setupThemeToggle();
});

// 🔹 Function to Load Goals
function loadGoals() {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    renderGoals(goals);
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

// 🔹 Function to Reset the Form After Adding or Editing a Goal
function resetForm() {
    document.getElementById("goal-title").value = "";
    document.getElementById("goal-description").value = "";
    document.getElementById("goal-status").value = "Future";
    document.getElementById("goal-progress").value = "";
    document.getElementById("goal-index").value = "";
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

// 🔹 Function to Save Goals in LocalStorage
function saveGoals(goals) {
    localStorage.setItem("goals", JSON.stringify(goals));
    loadGoals();
}

// 🔹 Function to Load and Display Media
function loadMedia() {
    let media = JSON.parse(localStorage.getItem("media")) || [];
    renderMedia(media);
}

// 🔹 Function to Upload Media
function uploadMedia() {
    const fileInput = document.getElementById("media-upload");
    if (fileInput.files.length === 0) return alert("Please select a file.");

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        let media = JSON.parse(localStorage.getItem("media")) || [];
        media.push({ name: file.name, url: e.target.result });
        saveMedia(media);
    };
    reader.readAsDataURL(file);
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

// 🔹 Toggle Goal Management Section Visibility
function toggleGoalSection() {
    const goalContainer = document.getElementById("admin-goal-container");
    goalContainer.classList.toggle("hidden");
}

function addGoal() {
    const title = document.getElementById("goal-title").value.trim();
    const description = document.getElementById("goal-description").value.trim();
    if (!title || !description) return alert("Please enter goal title and description.");

    fetch("goals.json")
        .then(response => response.json())
        .then(goals => {
            goals.push({ title, description });
            saveGoals(goals);
        });
}

function deleteGoal(index) {
    fetch("goals.json")
        .then(response => response.json())
        .then(goals => {
            goals.splice(index, 1);
            saveGoals(goals);
        });
}

function saveGoals(goals) {
    fetch("save_goals.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goals)
    }).then(() => loadGoals());
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
