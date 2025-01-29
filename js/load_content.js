
document.addEventListener("DOMContentLoaded", () => {
    function loadFeatures() {
        const featureList = document.getElementById("feature-list");
        featureList.innerHTML = "";
        const features = JSON.parse(localStorage.getItem("features")) || [];
        features.forEach(feature => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${feature.title}</strong>: ${feature.description}`;
            featureList.appendChild(li);
        });
    }

    loadFeatures();
});
