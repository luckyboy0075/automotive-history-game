
document.addEventListener("DOMContentLoaded", () => {
    function loadBanner() {
        const banner = document.getElementById("banner");
        const bannerData = JSON.parse(localStorage.getItem("banner")) || { imageUrl: "" };
        if (bannerData.imageUrl) {
            banner.style.backgroundImage = `url('${bannerData.imageUrl}')`;
        } else {
            banner.style.backgroundColor = "#333";
        }
    }

    function loadFeatures() {
        const featureList = document.getElementById("feature-list");
        featureList.innerHTML = "";
        const features = JSON.parse(localStorage.getItem("features")) || [
            { title: "Realistic Racing", description: "Experience high-fidelity vehicle simulation.", imageUrl: "" },
            { title: "Historical Storytelling", description: "Relive automotive history through quests.", imageUrl: "" },
        ];
        features.forEach(feature => {
            const featureTile = document.createElement("div");
            featureTile.classList.add("feature-tile");
            featureTile.innerHTML = `
                ${feature.imageUrl ? `<img src="${feature.imageUrl}" alt="${feature.title}">` : ''}
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            featureList.appendChild(featureTile);
        });
    }

    loadBanner();
    loadFeatures();
});
