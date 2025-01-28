
document.addEventListener("DOMContentLoaded", () => {
    const existingSelectors = document.querySelectorAll("#languageSelect");
    if (existingSelectors.length > 1) {
        for (let i = 1; i < existingSelectors.length; i++) {
            existingSelectors[i].remove();  // Remove duplicate selectors
        }
    }
});
