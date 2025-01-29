
document.addEventListener("DOMContentLoaded", () => {
    const bannerForm = document.getElementById("banner-form");
    const featureForm = document.getElementById("key-feature-form");

    bannerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const bannerInput = document.getElementById("banner-upload").files[0];
        if (bannerInput) {
            const reader = new FileReader();
            reader.onload = (e) => {
                localStorage.setItem("banner", JSON.stringify({ imageUrl: e.target.result }));
                alert("Banner updated successfully!");
            };
            reader.readAsDataURL(bannerInput);
        }
    });

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
        const storedFeatures = JSON.parse(localStorage.getItem("features")) || [];
        storedFeatures.push({ title, description, imageUrl });
        localStorage.setItem("features", JSON.stringify(storedFeatures));
        alert("Feature added successfully!");
    }
});
