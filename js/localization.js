
document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        en: {
            contact_us: "Contact Us",
            subscribe_updates: "Subscribe to Updates",
            goals: "Goals",
            progress: "Progress",
            key_features: "Key Features",
        },
        fr: {
            contact_us: "Nous contacter",
            subscribe_updates: "S'abonner aux mises à jour",
            goals: "Objectifs",
            progress: "Progrès",
            key_features: "Caractéristiques clés",
        },
        de: {
            contact_us: "Kontaktiere uns",
            subscribe_updates: "Abonniere Updates",
            goals: "Ziele",
            progress: "Fortschritt",
            key_features: "Hauptmerkmale",
        },
        es: {
            contact_us: "Contáctanos",
            subscribe_updates: "Suscribirse a actualizaciones",
            goals: "Metas",
            progress: "Progreso",
            key_features: "Características clave",
        },
        it: {
            contact_us: "Contattaci",
            subscribe_updates: "Iscriviti agli aggiornamenti",
            goals: "Obiettivi",
            progress: "Progresso",
            key_features: "Caratteristiche principali",
        },
        uk: {
            contact_us: "Зв'яжіться з нами",
            subscribe_updates: "Підписатися на оновлення",
            goals: "Цілі",
            progress: "Прогрес",
            key_features: "Ключові особливості",
        }
    };

    const langSelect = document.getElementById("languageSelect");
    const elementsToTranslate = {
        contact_us: "#contactButton",
        subscribe_updates: "#subscribeButton",
        goals: "#goalsTitle",
        progress: "#progressLabel",
        key_features: "#keyFeaturesTitle"
    };

    function applyTranslations(lang) {
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

    // Apply default language
    applyTranslations(langSelect.value || "en");
});
