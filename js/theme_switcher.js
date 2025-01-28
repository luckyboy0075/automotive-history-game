
document.addEventListener("DOMContentLoaded", () => {
    const darkThemeButton = document.getElementById("dark-theme");
    const lightThemeButton = document.getElementById("light-theme");

    darkThemeButton.addEventListener("click", () => {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    });

    lightThemeButton.addEventListener("click", () => {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
    });
});
