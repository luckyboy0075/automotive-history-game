
document.addEventListener("DOMContentLoaded", () => {
    function loadFeatures() {
        const featureList = document.getElementById("feature-list");
        featureList.innerHTML = "";
        const features = JSON.parse(localStorage.getItem("features")) || [
            { title: "Realistic Racing", description: "Experience high-fidelity vehicle simulation." },
            { title: "Historical Storytelling", description: "Relive automotive history through quests." },
        ];
        features.forEach(feature => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${feature.title}</strong>: ${feature.description}`;
            featureList.appendChild(li);
        });
    }

    function loadMainText() {
        const banner = document.getElementById("banner");
        const mainText = JSON.parse(localStorage.getItem("mainText")) || {
            title: "The Future of Automotive History",
            description: "Discover the untold stories behind the evolution of the automotive industry."
        };
        banner.innerHTML = `<h2>${mainText.title}</h2><p>${mainText.description}</p>`;
    }

    loadFeatures();
    loadMainText();
});
