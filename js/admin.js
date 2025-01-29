
document.addEventListener("DOMContentLoaded", () => {
    const featureForm = document.getElementById("key-feature-form");
    const mainTextForm = document.getElementById("main-text-form");

    featureForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("feature-title").value;
        const description = document.getElementById("feature-description").value;
        saveData("features", { title, description });
        featureForm.reset();
    });

    mainTextForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("main-title").value;
        const description = document.getElementById("main-description").value;
        localStorage.setItem("mainText", JSON.stringify({ title, description }));
        alert("Main page text updated!");
    });

    function saveData(type, data) {
        const storedData = JSON.parse(localStorage.getItem(type)) || [];
        storedData.push(data);
        localStorage.setItem(type, JSON.stringify(storedData));
        alert("Data saved successfully!");
    }
});
