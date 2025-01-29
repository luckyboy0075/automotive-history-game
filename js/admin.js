
document.addEventListener("DOMContentLoaded", () => {
    const featureForm = document.getElementById("key-feature-form");
    const goalForm = document.getElementById("goal-form");
    const socialMediaForm = document.getElementById("social-media-form");

    featureForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("feature-title").value;
        const description = document.getElementById("feature-description").value;
        saveData("features", { title, description });
        featureForm.reset();
    });

    goalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("goal-title").value;
        const description = document.getElementById("goal-description").value;
        const status = document.getElementById("goal-status").value;
        saveData("goals", { title, description, status });
        goalForm.reset();
    });

    socialMediaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("platform-name").value;
        const link = document.getElementById("platform-link").value;
        saveData("social_media", { name, link });
        socialMediaForm.reset();
    });

    function saveData(type, data) {
        const storedData = JSON.parse(localStorage.getItem(type)) || [];
        storedData.push(data);
        localStorage.setItem(type, JSON.stringify(storedData));
        alert("Data saved successfully!");
    }
});
