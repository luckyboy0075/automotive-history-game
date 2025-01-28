
document.addEventListener("DOMContentLoaded", () => {
    const loadMedia = () => {
        fetch('./content/media.json')
            .then((response) => response.json())
            .then((mediaData) => {
                const mediaContainer = document.querySelector(".media-gallery");
                mediaContainer.innerHTML = "";
                mediaData.forEach((media) => {
                    const mediaItem = document.createElement("div");
                    mediaItem.className = "media-item";
                    if (media.media_type === "Image") {
                        mediaItem.innerHTML = `<img src="${media.media_url}" alt="${media.media_title}">
                                               <p>${media.media_description}</p>`;
                    } else if (media.media_type === "Video") {
                        mediaItem.innerHTML = `<video controls>
                                                <source src="${media.media_url}" type="video/mp4">
                                                </video><p>${media.media_description}</p>`;
                    }
                    mediaContainer.appendChild(mediaItem);
                });
            })
            .catch((error) => console.error("Media Loading Error:", error));
    };

    setInterval(loadMedia, 5000); // Refresh media every 5 seconds
});
