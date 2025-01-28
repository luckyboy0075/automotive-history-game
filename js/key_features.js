
document.addEventListener("DOMContentLoaded", () => {
    fetch('./content/key_features.json')
        .then(response => response.json())
        .then(data => {
            const keyFeaturesContainer = document.getElementById("key-features");

            keyFeaturesContainer.innerHTML = "";

            data.forEach(feature => {
                const featureElement = document.createElement("div");
                featureElement.className = "feature";
                featureElement.innerHTML = `<h3>${feature.title}</h3><p>${feature.description}</p>`;
                keyFeaturesContainer.appendChild(featureElement);
            });
        })
        .catch(error => console.error("Error loading key features:", error));
});
