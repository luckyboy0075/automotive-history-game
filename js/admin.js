
document.addEventListener("DOMContentLoaded", () => {
    const featureForm = document.getElementById("key-feature-form");
    const featureList = document.getElementById("feature-list");

    featureForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("feature-title").value;
        const description = document.getElementById("feature-description").value;
        const featureImage = document.getElementById("feature-image").files[0];

        if (!title || !description) {
            alert("Title and description are required!");
            return;
        }

        if (featureImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                saveFeature(title, description, e.target.result);
            };
            reader.readAsDataURL(featureImage);
        } else {
            saveFeature(title, description, "");
        }
        featureForm.reset();
    });

    function saveFeature(title, description, imageUrl) {
        let storedFeatures = JSON.parse(localStorage.getItem("features")) || [];
        storedFeatures.push({ title, description, imageUrl });
        localStorage.setItem("features", JSON.stringify(storedFeatures));
        loadFeatures();
    }

    function loadFeatures() {
        featureList.innerHTML = "";
        const features = JSON.parse(localStorage.getItem("features")) || [];
        features.forEach((feature, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${feature.title}</strong>: ${feature.description}
                ${feature.imageUrl ? `<img src="${feature.imageUrl}" alt="${feature.title}" style="width:50px; height:auto;">` : ''}
                <button onclick="editFeature(${index})">Edit</button>
                <button onclick="deleteFeature(${index})">Delete</button>
            `;
            featureList.appendChild(li);
        });
    }

    window.editFeature = (index) => {
        const features = JSON.parse(localStorage.getItem("features")) || [];
        const feature = features[index];

        document.getElementById("feature-title").value = feature.title;
        document.getElementById("feature-description").value = feature.description;

        features.splice(index, 1);  // Remove the old entry before saving
        localStorage.setItem("features", JSON.stringify(features));
        loadFeatures();
    };

    window.deleteFeature = (index) => {
        let features = JSON.parse(localStorage.getItem("features")) || [];
        features.splice(index, 1);
        localStorage.setItem("features", JSON.stringify(features));
        loadFeatures();
    };

    loadFeatures();
});
