
document.addEventListener("DOMContentLoaded", () => {
    const selectors = document.querySelectorAll("#languageSelect");
    if (selectors.length > 1) {
        for (let i = 1; i < selectors.length; i++) {
            selectors[i].remove();
        }
    }
});
