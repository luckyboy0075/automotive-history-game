
let currentLang = localStorage.getItem('language') || 'en';

const translations = {
    en: {
        mainTitle: "Discover the Untold History of Cars",
        aboutTitle: "About the Game",
        aboutDesc: "Automotive History Game is a unique blend of storytelling and simulation, designed to educate and entertain.",
        keyFeaturesTitle: "Key Features",
        storytelling: "Storytelling Mode",
        storytellingDesc: "Immerse yourself in the lives of iconic figures like Ferdinand Porsche and the evolution of automotive history.",
        simulation: "Simulation Mode",
        simulationDesc: "Build, customize, and race your cars in highly realistic environments.",
        educational: "Educational Gameplay",
        educationalDesc: "Learn about automotive innovations, traffic laws, and the history of motorsport."
    },
    fr: {
        mainTitle: "Découvrez l'histoire inédite des voitures",
        aboutTitle: "À propos du jeu",
        aboutDesc: "Automotive History Game est un mélange unique de narration et de simulation, conçu pour éduquer et divertir.",
        keyFeaturesTitle: "Caractéristiques principales",
        storytelling: "Mode Narration",
        storytellingDesc: "Plongez dans la vie de personnages emblématiques comme Ferdinand Porsche.",
        simulation: "Mode Simulation",
        simulationDesc: "Construisez, personnalisez et courez avec vos voitures dans des environnements réalistes.",
        educational: "Jeu Éducatif",
        educationalDesc: "Apprenez les innovations automobiles, les lois de circulation et l'histoire du sport automobile."
    },
    de: {
        mainTitle: "Entdecken Sie die unentdeckte Geschichte der Autos",
        aboutTitle: "Über das Spiel",
        aboutDesc: "Automotive History Game ist eine einzigartige Mischung aus Erzählung und Simulation, entwickelt, um zu bilden und zu unterhalten.",
        keyFeaturesTitle: "Hauptmerkmale",
        storytelling: "Erzählmodus",
        storytellingDesc: "Tauchen Sie ein in das Leben ikonischer Persönlichkeiten wie Ferdinand Porsche.",
        simulation: "Simulationsmodus",
        simulationDesc: "Bauen, personalisieren und fahren Sie Ihre Autos in realistischen Umgebungen.",
        educational: "Bildungsspiel",
        educationalDesc: "Erfahren Sie mehr über Innovationen im Automobilbereich und die Geschichte des Motorsports."
    },
    es: {
        mainTitle: "Descubre la historia no contada de los automóviles",
        aboutTitle: "Acerca del juego",
        aboutDesc: "Automotive History Game es una mezcla única de narración y simulación, diseñada para educar y entretener.",
        keyFeaturesTitle: "Características principales",
        storytelling: "Modo Narración",
        storytellingDesc: "Sumérgete en las vidas de figuras icónicas como Ferdinand Porsche.",
        simulation: "Modo Simulación",
        simulationDesc: "Construye, personaliza y corre con tus autos en entornos realistas.",
        educational: "Juego Educativo",
        educationalDesc: "Aprende sobre innovaciones automotrices, leyes de tránsito y la historia del automovilismo."
    },
    it: {
        mainTitle: "Scopri la storia inedita delle automobili",
        aboutTitle: "Informazioni sul gioco",
        aboutDesc: "Automotive History Game è un mix unico di narrazione e simulazione, progettato per educare e intrattenere.",
        keyFeaturesTitle: "Caratteristiche principali",
        storytelling: "Modalità Narrativa",
        storytellingDesc: "Immergiti nella vita di figure iconiche come Ferdinand Porsche.",
        simulation: "Modalità Simulazione",
        simulationDesc: "Costruisci, personalizza e gareggia con le tue auto in ambienti realistici.",
        educational: "Gioco Educativo",
        educationalDesc: "Scopri le innovazioni automobilistiche, le leggi del traffico e la storia del motorsport."
    },
    uk: {
        mainTitle: "Відкрийте невідому історію автомобілів",
        aboutTitle: "Про гру",
        aboutDesc: "Automotive History Game - це унікальне поєднання розповіді та симуляції, розроблене для навчання та розваг.",
        keyFeaturesTitle: "Ключові Особливості",
        storytelling: "Режим Розповіді",
        storytellingDesc: "Пориньте у життя знакових особистостей, таких як Фердинанд Порше.",
        simulation: "Режим Симуляції",
        simulationDesc: "Створюйте, налаштовуйте та змагайтеся на своїх автомобілях у реалістичних середовищах.",
        educational: "Освітня Гра",
        educationalDesc: "Дізнайтеся про автомобільні інновації, правила дорожнього руху та історію автоспорту."
    }
};

function updateTranslations() {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        el.textContent = translations[currentLang][key];
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("language", lang);
    updateTranslations();
}

document.addEventListener("DOMContentLoaded", () => {
    currentLang = localStorage.getItem("language") || "en";
    document.getElementById("languageSelect").value = currentLang;
    updateTranslations();
    document.getElementById("languageSelect").addEventListener("change", (e) => {
        changeLanguage(e.target.value);
    });
});

translations.en.goalsTitle = "Project Goals";
translations.en.completedGoals = "✅ Completed Goals";
translations.en.goal1 = "Website Launch";
translations.en.goal2 = "Localization Implemented";
translations.en.goal3 = "Core Mechanics Defined";
translations.en.futureGoals = "🚀 Future Goals";
translations.en.goal4 = "Implement Advanced Driving Physics";
translations.en.goal5 = "Expand Historical Storytelling Mode";
translations.en.goal6 = "Develop AI-Based Racing System";
translations.en.progress = "📊 Progress";
