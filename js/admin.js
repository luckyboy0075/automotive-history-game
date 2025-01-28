
document.addEventListener("DOMContentLoaded", () => {
    fetch("/.netlify/identity/user").then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            window.location.href = "index.html";
        }
    }).then((user) => {
        const roles = user.app_metadata.roles || [];
        if (!roles.includes("admin")) {
            alert("Access Denied: Admins Only");
            window.location.href = "index.html";
        }
    }).catch(() => {
        window.location.href = "index.html";
    });
});
