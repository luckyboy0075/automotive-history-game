
document.addEventListener("DOMContentLoaded", () => {
    fetch('./content/goals.json')
        .then(response => response.json())
        .then(data => {
            const completed = data.filter(goal => goal.status === "Completed").length;
            const total = data.length;
            const progressBar = document.getElementById("progress-bar");
            const progressText = document.getElementById("progress-text");

            const percentage = (completed / total) * 100;
            progressBar.style.width = percentage + "%";
            progressText.textContent = `Progress: ${completed} of ${total} goals completed (${Math.round(percentage)}%)`;
        })
        .catch(error => console.error("Error loading goals:", error));
});
