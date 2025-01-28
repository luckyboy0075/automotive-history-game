
document.addEventListener("DOMContentLoaded", () => {
    fetch('./content/goals.json')
        .then((response) => response.json())
        .then((goalsData) => {
            if (!Array.isArray(goalsData)) throw new Error("Invalid goals data format");
            const completed = goalsData.filter(goal => goal.status === "Completed").length;
            const total = goalsData.length || 1;  // Avoid division by zero
            const progressBar = document.getElementById("progress-bar");
            const progressText = document.getElementById("progress-text");
            const percentage = (completed / total) * 100;
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `Progress: ${completed} of ${total} goals completed (${Math.round(percentage)}%)`;
        })
        .catch((error) => console.error("Goals Loading Error:", error));
});
