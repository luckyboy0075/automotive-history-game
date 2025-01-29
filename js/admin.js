
document.addEventListener("DOMContentLoaded", function () {
    loadGoals();
});

function loadGoals() {
    fetch("goals.json")
        .then(response => response.json())
        .then(data => renderAdminGoals(data))
        .catch(error => console.error("Error loading goals:", error));
}

function renderAdminGoals(goals) {
    const adminContainer = document.getElementById("admin-goals");
    adminContainer.innerHTML = "";

    goals.forEach((goal, index) => {
        const goalElement = document.createElement("div");
        goalElement.classList.add("goal-item");

        goalElement.innerHTML = `
            <input type="text" value="${goal.title}" id="title-${index}">
            <textarea id="description-${index}">${goal.description}</textarea>
            <select id="status-${index}">
                <option value="Future" ${goal.status === "Future" ? "selected" : ""}>Future</option>
                <option value="In Progress" ${goal.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Achieved" ${goal.status === "Achieved" ? "selected" : ""}>Achieved</option>
            </select>
            ${goal.status === "In Progress" ? `<input type="number" value="${goal.progress}" id="progress-${index}" min="0" max="100">` : ""}
            <input type="file" id="image-${index}" accept="image/*">
            <button onclick="updateGoal(${index})">Save</button>
            <button onclick="deleteGoal(${index})">Delete</button>
        `;

        adminContainer.appendChild(goalElement);
    });
}

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
