
document.addEventListener("DOMContentLoaded", () => {
    function loadMedia() {
        fetch('./content/media.json')
            .then(response => response.json())
            .then(data => {
                const mediaGallery = document.querySelector(".media-gallery");
                mediaGallery.innerHTML = "";  // Clear gallery before reloading

                data.forEach(media => {
                    const mediaItem = document.createElement("div");
                    mediaItem.className = "media-item";

                    let mediaContent = "";
                    if (media.media_type === "Image") {
                        mediaContent = `<img src="${media.media_url}" alt="${media.media_title}"><p>${media.media_description}</p>`;
                    } else if (media.media_type === "Video") {
                        mediaContent = `<video controls><source src="${media.media_url}" type="video/mp4">Your browser does not support videos.</video><p>${media.media_description}</p>`;
                    }

                    mediaItem.innerHTML = mediaContent;
                    mediaGallery.appendChild(mediaItem);
                });
            })
            .catch(error => console.error("Error loading media:", error));
    }

    setInterval(loadMedia, 5000);  // Auto-refresh media every 5 seconds
});
