document.addEventListener('DOMContentLoaded', function () {
    const userLang = navigator.language || navigator.userLanguage;
    // Exemplo: 'en-US' -> 'en'
    const lang = userLang.split('-')[0];

    // Função para carregar o JSON de tradução
    function loadTranslation(lang) {
        fetch(`./assets/locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                applyTranslations(translations);
            })
            .catch(() => {
                console.error(`Translations for ${lang} not found, falling back to English.`);
                fetch(`./assets/locales/en.json`)
                    .then(response => response.json())
                    .then(translations => {
                        applyTranslations(translations);
                    });
            });
    }

    // Função para aplicar as traduções ao DOM
    function applyTranslations(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translatedLabel = getTranslatedLabelFromKeyList(translations, key);
            if (translatedLabel) {
                element.innerText = translatedLabel;
            }
        });
    }

    function getTranslatedLabelFromKeyList(translation, key) {
        const keyList = key.split(".");
        var translatedLabel = null;
        var nestedElement = null;

        for (var i = 0; i < keyList.length; i++) {
            var key = keyList[i];
            var elementToCheck = nestedElement === null ? translation : nestedElement;
            if (typeof elementToCheck[key] === 'object') {
                nestedElement = elementToCheck[key];
            }

            if (typeof elementToCheck[key] === 'string') {
                translatedLabel = elementToCheck[key];
            }
        }
        return translatedLabel;
    }

    // Carregar a tradução apropriada
    loadTranslation(lang);
});
