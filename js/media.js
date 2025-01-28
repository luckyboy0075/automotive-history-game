
document.addEventListener("DOMContentLoaded", () => {
    fetch('./content/media.json')
        .then(response => response.json())
        .then(data => {
            const mediaGallery = document.querySelector(".media-gallery");

            mediaGallery.innerHTML = "";

            data.forEach(media => {
                const mediaItem = document.createElement("div");
                mediaItem.className = "media-item";

                if (media.media_type === "Image") {
                    mediaItem.innerHTML = `<img src="${media.media_url}" alt="${media.media_title}">`;
                } else if (media.media_type === "Video") {
                    mediaItem.innerHTML = `<video controls><source src="${media.media_url}" type="video/mp4">Your browser does not support videos.</video>`;
                }

                mediaGallery.appendChild(mediaItem);
            });
        })
        .catch(error => console.error("Error loading media:", error));
});
