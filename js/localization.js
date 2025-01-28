
document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        "en": { "contact_us": "Contact Us", "subscribe_updates": "Subscribe to Updates" },
        "fr": { "contact_us": "Nous contacter", "subscribe_updates": "S'abonner aux mises à jour" },
        "de": { "contact_us": "Kontaktiere uns", "subscribe_updates": "Abonniere Updates" },
        "es": { "contact_us": "Contáctanos", "subscribe_updates": "Suscribirse a actualizaciones" },
        "it": { "contact_us": "Contattaci", "subscribe_updates": "Iscriviti agli aggiornamenti" },
        "uk": { "contact_us": "Зв'яжіться з нами", "subscribe_updates": "Підписатися на оновлення" }
    };

    function updateText(language) {
        document.querySelector("#contactButton").textContent = translations[language].contact_us;
        document.querySelector("#subscribeButton").textContent = translations[language].subscribe_updates;
    }

    document.querySelector("#languageSelect").addEventListener("change", (event) => {
        updateText(event.target.value);
    });
});
