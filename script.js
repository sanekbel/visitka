const translations = {
    ru: {
        'role': 'Предприниматель и AQA‑инженер',
        'theme': 'Сменить тему',
        'intro-a': 'Делаю продукты для падела: турниры для клубов в ',
        'intro-b': ' и запись к тренерам в ',
        'intro-c': '. А ещё ',
        'intro-d': ' — VPN, который включается в одно касание.',
        'intro-2': 'Люблю изучать новое и сразу применять знания на практике.',
        'projects': 'Проекты',
        'contacts': 'Контакты',
        'seed': 'Турниры по паделу для клубов: сетки, расписание, счёт с кортов и ТВ-табло',
        'padel': 'Запись к тренеру в Telegram: слоты, лист ожидания, оплаты',
        'vpn': 'VPN, который включается в одно касание'
    },
    en: {
        'role': 'Entrepreneur and AQA engineer',
        'theme': 'Toggle theme',
        'intro-a': 'I build products for padel: tournaments for clubs with ',
        'intro-b': ' and coach bookings with ',
        'intro-c': '. Also ',
        'intro-d': ', a VPN that turns on with one tap.',
        'intro-2': 'I love learning new things and immediately applying knowledge in practice.',
        'projects': 'Projects',
        'contacts': 'Contacts',
        'seed': 'Padel tournaments for clubs: draws, schedule, live scores and a TV board',
        'padel': 'Coach bookings in Telegram: slots, waiting list, payments',
        'vpn': 'A VPN that turns on with one tap'
    }
};

const root = document.documentElement;
const SWAP_OUT_MS = 120;
const THEME_ANIM_MS = 300;

function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked: the choice just isn't remembered */ }
}

/* Language */

function applyLanguage(lang) {
    const dict = translations[lang];
    root.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const text = dict[el.getAttribute('data-i18n')];
        if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
        const text = dict[el.getAttribute('data-i18n-label')];
        if (text) el.setAttribute('aria-label', text);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
}

let swapTimer = null;

function switchLanguage(lang) {
    if (root.lang === lang) return;
    write('language', lang);
    clearTimeout(swapTimer);
    document.body.classList.add('is-swapping');
    swapTimer = setTimeout(() => {
        applyLanguage(lang);
        document.body.classList.remove('is-swapping');
    }, SWAP_OUT_MS);
}

/* Theme: follows the system until the visitor picks one */

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function effectiveTheme() {
    const chosen = root.getAttribute('data-theme');
    if (chosen === 'light' || chosen === 'dark') return chosen;
    return systemDark.matches ? 'dark' : 'light';
}

const THEME_BG = { light: '#fbfbfa', dark: '#0e0e0e' };
const themeMetas = Array.from(document.querySelectorAll('meta[name="theme-color"]'));

function syncScheme() {
    const scheme = effectiveTheme();
    root.setAttribute('data-scheme', scheme);
    // Mobile browser bar follows a manual choice too, not only the system setting
    const chosen = root.hasAttribute('data-theme');
    themeMetas.forEach(meta => {
        const own = meta.media.includes('dark') ? THEME_BG.dark : THEME_BG.light;
        meta.setAttribute('content', chosen ? THEME_BG[scheme] : own);
    });
}

let themeTimer = null;

function toggleTheme() {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    clearTimeout(themeTimer);
    root.classList.add('theme-anim');
    root.setAttribute('data-theme', next);
    write('theme', next);
    syncScheme();
    themeTimer = setTimeout(() => root.classList.remove('theme-anim'), THEME_ANIM_MS);
}

syncScheme();
systemDark.addEventListener('change', syncScheme);

document.addEventListener('DOMContentLoaded', () => {
    const saved = read('language');
    applyLanguage(saved === 'en' ? 'en' : 'ru');

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });
    document.querySelector('.theme-btn').addEventListener('click', toggleTheme);
});
