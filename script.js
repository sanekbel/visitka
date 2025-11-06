// Переводы для мультиязычности
const translations = {
    ru: {
        'bio': 'Привет! Я люблю изучать новое и сразу применять знания на практике.',
        'projects-title': 'Проекты',
        'contacts-title': 'Контакты',
        'open-telegram': 'Открыть в Telegram',
        'events-list-desc': 'Telegram-бот для управления списком событий. Помогает отслеживать и организовывать мероприятия.',
        'isittrue-desc': 'Telegram-бот для проверки видео на фейки и манипуляции. Анализирует контент из Instagram, TikTok и YouTube, определяя подделки и редактирование. Помогает отличить реальные факты видео от сгенерированных или измененных с помощью ИИ.',
        'vipn-desc': 'VPN-сервис в формате Telegram-бота с серверами в Нидерландах. Поддерживает современные протоколы Xray и OpenVPN для максимальной скорости и безопасности. Простая настройка и управление через удобный интерфейс бота.',
        'vipn-usa-desc': 'VPN-сервис с серверами в США, реализованный как Telegram-бот. Использует протоколы Xray и OpenVPN для обеспечения высокой скорости соединения и защиты данных. Идеальное решение для доступа к контенту и обеспечения приватности.',
        'image-ai-desc': 'Инновационный Telegram-бот для оживления фотографий с помощью искусственного интеллекта. Превращает статичные изображения в динамичные видео, создавая эффект движения и оживления. Просто загрузите фото и получите анимированный результат.',
        'octopusmm-desc': 'Мощный помощник для авторов Telegram-каналов. Анализирует конкурентов, помогает в написании постов и оптимизации контента. Инструмент для роста и развития канала с использованием данных и аналитики.'
    },
    en: {
        'bio': 'Hello! I love learning new things and immediately applying knowledge in practice.',
        'projects-title': 'Projects',
        'contacts-title': 'Contacts',
        'open-telegram': 'Open in Telegram',
        'events-list-desc': 'Telegram bot for managing event lists. Helps track and organize events.',
        'isittrue-desc': 'Telegram bot for checking videos for fakes and manipulations. Analyzes content from Instagram, TikTok, and YouTube, detecting forgeries and editing. Helps distinguish real video facts from AI-generated or modified ones.',
        'vipn-desc': 'VPN service in Telegram bot format with servers in the Netherlands. Supports modern Xray and OpenVPN protocols for maximum speed and security. Simple setup and management through a convenient bot interface.',
        'vipn-usa-desc': 'VPN service with servers in the USA, implemented as a Telegram bot. Uses Xray and OpenVPN protocols to ensure high connection speed and data protection. Perfect solution for content access and privacy.',
        'image-ai-desc': 'Innovative Telegram bot for bringing photos to life using artificial intelligence. Transforms static images into dynamic videos, creating movement and animation effects. Simply upload a photo and get an animated result.',
        'octopusmm-desc': 'Powerful assistant for Telegram channel authors. Analyzes competitors, helps with post writing and content optimization. Tool for channel growth and development using data and analytics.'
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
