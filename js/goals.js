
document.addEventListener("DOMContentLoaded", () => {
    fetch('./content/goals.json')
        .then(response => response.json())
        .then(data => {
            const completedGoals = document.getElementById("completed-goals");
            const futureGoals = document.getElementById("future-goals");
            const progressBar = document.getElementById("progress-bar");

            let progressSum = 0;
            let progressCount = 0;

            data.forEach(goal => {
                const goalElement = document.createElement("li");
                goalElement.textContent = goal.title;

                if (goal.status === "Completed") {
                    completedGoals.appendChild(goalElement);
                } else if (goal.status === "Planned") {
                    futureGoals.appendChild(goalElement);
                }

                if (goal.progress) {
                    progressSum += goal.progress;
                    progressCount++;
                }
            });

            // Update progress bar
            const averageProgress = progressCount > 0 ? (progressSum / progressCount) : 0;
            progressBar.style.width = `${averageProgress}%`;
        })
        .catch(error => console.error("Error loading goals:", error));
});
