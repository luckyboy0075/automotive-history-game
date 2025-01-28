
setInterval(() => {
    fetch('./content/version.json')
        .then(response => response.json())
        .then(data => {
            const currentVersion = localStorage.getItem("cmsVersion") || "";
            if (currentVersion !== data.version) {
                localStorage.setItem("cmsVersion", data.version);
                location.reload();
            }
        })
        .catch(error => console.error("Error checking for updates:", error));
}, 5000);
