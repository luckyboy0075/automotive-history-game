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

// 🔹 Function to Add a New Goal
function addGoal() {
    const title = document.getElementById("goal-title").value.trim();
    const description = document.getElementById("goal-description").value.trim();
    const status = document.getElementById("goal-status").value;
    const progress = document.getElementById("goal-progress").value || "0";  // Default to 0%

    if (!title || !description) {
        alert("Please enter a goal title and description.");
        return;
    }

    const newGoal = {
        title: title,
        description: description,
        status: status,
        progress: progress
    };

    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(newGoal);
    saveGoals(goals);
}

// 🔹 Function to Load Goals
function loadGoals() {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    if (goals.length === 0) {
        // Initialize with default goals if empty
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
            <button onclick="deleteGoal(${index})">🗑 Delete</button>
        `;
        goalList.appendChild(goalElement);
    });
}

// 🔹 Function to Delete a Goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.splice(index, 1);
    saveGoals(goals);
}

// 🔹 Function to Save Goals in LocalStorage (Instead of a File)
function saveGoals(goals) {
    localStorage.setItem("goals", JSON.stringify(goals));
    loadGoals();  // Reload goal list after saving
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
