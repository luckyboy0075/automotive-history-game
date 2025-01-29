
document.addEventListener("DOMContentLoaded", () => {
    if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", (user) => {
            if (!user) {
                document.getElementById("login-btn").style.display = "block";
                document.getElementById("logout-btn").style.display = "none";
            } else {
                checkAdminAccess(user);
            }
        });

        document.getElementById("login-btn").addEventListener("click", () => {
            window.netlifyIdentity.open();
        });

        document.getElementById("logout-btn").addEventListener("click", () => {
            window.netlifyIdentity.logout();
            document.location.href = "/index.html";
        });

        window.netlifyIdentity.on("login", (user) => {
            checkAdminAccess(user);
        });

        window.netlifyIdentity.on("logout", () => {
            document.location.href = "/index.html";
        });
    }
});

function checkAdminAccess(user) {
    const roles = user.app_metadata && user.app_metadata.roles ? user.app_metadata.roles : [];
    if (roles.includes("admin")) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    } else {
        alert("Access Denied: Admins Only");
        window.location.href = "index.html";
    }
}
