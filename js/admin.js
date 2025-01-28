
document.addEventListener("DOMContentLoaded", () => {
    fetch("/.netlify/identity/user")
    .then((response) => response.json())
    .then((user) => {
        if (!user || !user.app_metadata.roles.includes("admin")) {
            alert("Access Denied: Admins Only");
            window.location.href = "index.html";
        }
    })
    .catch(() => {
        window.location.href = "index.html";
    });
});
