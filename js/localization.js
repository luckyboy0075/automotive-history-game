
document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        en: { contact_us: "Contact Us", subscribe_updates: "Subscribe to Updates", key_features: "Key Features" },
        fr: { contact_us: "Nous contacter", subscribe_updates: "S'abonner aux mises à jour", key_features: "Caractéristiques clés" },
        de: { contact_us: "Kontaktiere uns", subscribe_updates: "Abonniere Updates", key_features: "Hauptmerkmale" },
        es: { contact_us: "Contáctanos", subscribe_updates: "Suscribirse a actualizaciones", key_features: "Características clave" },
        it: { contact_us: "Contattaci", subscribe_updates: "Iscriviti agli aggiornamenti", key_features: "Caratteristiche principali" },
        uk: { contact_us: "Зв'яжіться з нами", subscribe_updates: "Підписатися на оновлення", key_features: "Ключові особливості" }
    };

    const langSelect = document.getElementById("languageSelect");
    const elementsToTranslate = {
        contact_us: "#contactButton",
        subscribe_updates: "#subscribeButton",
        key_features: "#keyFeaturesTitle"
    };

    function applyTranslations(lang) {
        if (!translations[lang]) lang = "en";
        Object.entries(elementsToTranslate).forEach(([key, selector]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = translations[lang][key] || translations.en[key];
            }
        });
    }

    langSelect.addEventListener("change", () => {
        applyTranslations(langSelect.value);
    });

    applyTranslations(langSelect.value || "en");
});
