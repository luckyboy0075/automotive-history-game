
document.addEventListener("DOMContentLoaded", () => {
    fetch('./content/goals.json')
        .then(response => response.json())
        .then(data => {
            const completedGoals = document.getElementById("completed-goals");
            const futureGoals = document.getElementById("future-goals");

            completedGoals.innerHTML = "";
            futureGoals.innerHTML = "";

            data.forEach(goal => {
                const goalElement = document.createElement("li");
                goalElement.textContent = `${goal.title}: ${goal.description}`;

                if (goal.status === "Completed") {
                    completedGoals.appendChild(goalElement);
                } else if (goal.status === "Planned") {
                    futureGoals.appendChild(goalElement);
                }
            });
        })
        .catch(error => console.error("Error loading goals:", error));
});
