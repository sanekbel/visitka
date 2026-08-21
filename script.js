// Переводы для мультиязычности
const translations = {
    ru: {
        'bio': 'Привет! Я люблю изучать новое и сразу применять знания на практике.',
        'projects-title': 'Проекты',
        'contacts-title': 'Контакты',
        'open-telegram': 'Открыть в Telegram',
        'open-site': 'Открыть сайт',
        'brokenvpn-desc': 'VPN-сервис с быстрым подключением и простой настройкой. Современные протоколы, стабильные серверы и понятный интерфейс без лишних шагов.',
        'isittrue-desc': 'Telegram-бот для проверки видео на фейки и манипуляции. Анализирует контент из Instagram, TikTok и YouTube, определяя подделки и редактирование. Помогает отличить реальные факты видео от сгенерированных или измененных с помощью ИИ.',
        'events-list-desc': 'Telegram-бот для управления списком событий. Помогает отслеживать и организовывать мероприятия.'
    },
    en: {
        'bio': 'Hello! I love learning new things and immediately applying knowledge in practice.',
        'projects-title': 'Projects',
        'contacts-title': 'Contacts',
        'open-telegram': 'Open in Telegram',
        'open-site': 'Open website',
        'brokenvpn-desc': 'VPN service with fast connection and simple setup. Modern protocols, stable servers, and a clear interface with no extra steps.',
        'isittrue-desc': 'Telegram bot for checking videos for fakes and manipulations. Analyzes content from Instagram, TikTok, and YouTube, detecting forgeries and editing. Helps distinguish real video facts from AI-generated or modified ones.',
        'events-list-desc': 'Telegram bot for managing event lists. Helps track and organize events.'
    }
};

// Функция переключения языка
function switchLanguage(lang) {
    // Обновляем атрибут lang у html элемента
    document.documentElement.lang = lang;
    
    // Обновляем все элементы с data-i18n атрибутом
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('language', lang);
    
    // Обновляем активную кнопку переключателя
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Плавная анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем сохраненный язык или используем русский по умолчанию
    const savedLang = localStorage.getItem('language') || 'ru';
    switchLanguage(savedLang);
    
    // Обработчики для кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Анимация появления контейнера
    const container = document.querySelector('.container');
    container.classList.add('fade-in');

    // Настройка Intersection Observer для анимации элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Анимация карточек проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Анимация социальных ссылок
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(link);
    });

    // Анимация заголовков секций
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(title);
    });
});
