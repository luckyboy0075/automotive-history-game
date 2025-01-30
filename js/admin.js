document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
    loadMedia();
    setupThemeToggle();
});

// 🔹 Manage Goals
function loadGoals() {
    fetch("goals.json")
        .then(response => response.json())
        .then(goals => renderGoals(goals))
        .catch(error => console.error("Error loading goals:", error));
}

// 🔹 Toggle Goal Management Section Visibility
function toggleGoalSection() {
    const goalContainer = document.getElementById("admin-goal-container");
    goalContainer.classList.toggle("hidden");
}

function renderGoals(goals) {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";
    goals.forEach((goal, index) => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item");
        goalElement.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <button onclick="deleteGoal(${index})">🗑 Delete</button>
        `;
        goalList.appendChild(goalElement);
    });
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
