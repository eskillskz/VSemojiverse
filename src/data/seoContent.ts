
import { Locale } from '../types';

interface SEOData {
  appTitle: string;
  metaDescription: string;
  mainHeading: string;
  subHeading: string;
  aboutTitle: string;
  aboutText: string[];
  faqTitle: string;
  faqIntro: string;
  faq: { q: string; a: string }[];
  keywords: string[];
}

type TabData = Record<'emoji' | 'kaomoji' | 'translit' | 'capslock', SEOData>;

const EN_CONTENT: TabData = {
  emoji: {
    appTitle: "EmojiVerse - Word Counter, Emoji Picker & Social Editor",
    metaDescription: "Free online Emoji Picker, Word Counter, and Character Counter. Check Instagram caption limits, copy emojis, and format text for social media.",
    mainHeading: "The Ultimate Emoji & Text Editor",
    subHeading: "Type, count words, format fonts, and find emojis in any language.",
    aboutTitle: "More Than Just Emojis",
    aboutText: [
      "Welcome to EmojiVerse, your all-in-one workspace for crafting the perfect social media posts. While we started as a comprehensive emoji library, we realized content creators needed more. That's why we built a powerful text editing suite right into the browser.",
      "Whether you are drafting an Instagram caption, writing a tweet, or composing an email, clarity matters. Our integrated **Word Counter** and **Character Counter** update in real-time, ensuring you hit your targets without guessing. We specifically included an **Instagram Limit Checker** (2,200 chars) so you never get cut off mid-sentence again.",
      "We believe in breaking language barriers. Our unique search engine allows you to find emojis using keywords in over 13 languages. Plus, with our new 'Magic Fonts' feature, you can transform boring text into bold, italic, or decorative styles to make your bio stand out."
    ],
    faqTitle: "Frequently Asked Questions",
    faqIntro: "Everything you need to know about using our text tools, counters, and emoji library.",
    faq: [
      { q: "Does this tool count words and characters?", a: "Yes! EmojiVerse is a fully functional Word Counter and Character Counter. As you type in the text area, look for the statistics bar just above the emoji list." },
      { q: "How does the Instagram Limit checker work?", a: "Instagram captions are limited to 2,200 characters. Our tool has a dedicated 'IG Limit' indicator that counts down as you type." },
      { q: "Is this service completely free?", a: "Absolutely. EmojiVerse is 100% free to use. We don't require registration, we don't charge subscriptions, and there are no hidden fees." },
      { q: "Can I search for emojis in my native language?", a: "Yes, whether you speak Spanish, Russian, Japanese, or Arabic, you can type keywords in your own language into the search bar." },
      { q: "Does the app save my text?", a: "For your privacy, we do not store your text on our servers. However, we use your browser's local storage to save your 'Favorites' and 'Recently Used' emojis." },
      { q: "How do I change the font style?", a: "Click the 'Instagram Fonts' (or Magic Wand) button in the text editor. A menu will appear letting you convert your normal text into Bold, Italic, or Gothic." },
      { q: "Does it work on mobile phones?", a: "Yes, EmojiVerse is designed as a Progressive Web App (PWA). It works perfectly on iPhones, iPads, and Android devices." },
      { q: "Can I copy multiple emojis at once?", a: "Yes. Unlike other pickers that copy one by one, EmojiVerse lets you build a whole sentence or a string of emojis in the editor and copy them all at once." },
      { q: "What browsers are supported?", a: "We support all modern browsers including Chrome, Safari, Firefox, Edge, and Opera." },
      { q: "Why use this instead of my phone keyboard?", a: "Phone keyboards are small and limited. EmojiVerse gives you a full-screen view, lets you count characters, and check limits." }
    ],
    keywords: ["Word Counter", "Character Counter", "Online Text Editor", "Instagram Caption Limit", "Emoji Picker", "Social Media Tool", "Copy Paste Emojis", "Font Generator", "Instagram Fonts", "Symbol Counter", "Unicode Characters", "IG Bio Fonts"]
  },
  kaomoji: {
    appTitle: "EmojiVerse - Kaomoji & Japanese Emoticons Library",
    metaDescription: "Huge collection of Japanese Kaomoji, text faces, and emoticons. Copy cute, sad, angry, and happy text faces for Discord, TikTok and Gaming.",
    mainHeading: "Japanese Kaomoji & Text Faces",
    subHeading: "Express yourself with thousands of cute, text-based Japanese emoticons.",
    aboutTitle: "More Than Just Text Faces",
    aboutText: [
      "Kaomoji (顔文字) are a popular style of Japanese emoticons made up of Japanese characters and grammar punctuations. Unlike regular emojis which are images, Kaomoji are created using text, making them work on almost any platform or game.",
      "Our **Kaomoji Library** provides a curated selection of the most popular text faces used in internet culture today. From the classic 'Shrug' ¯\\_(ツ)_/¯ to the 'Table Flip' (╯°□°)╯︵ ┻━┻, we have categorized them by emotion for easy access.",
      "These emoticons are perfect for **Discord**, **Twitch**, and **TikTok** comments where you want to stand out. Simply click on any Kaomoji to copy it instantly to your clipboard."
    ],
    faqTitle: "Common Questions",
    faqIntro: "Learn more about Kaomoji and how to use them effectively.",
    faq: [
      { q: "What is the difference between Emoji and Kaomoji?", a: "Emojis are images treated as characters by your device (😊). Kaomoji are created using text characters and punctuation ((^ _ ^)) to form faces." },
      { q: "Do Kaomoji work on all devices?", a: "Most modern devices support Kaomoji. However, some older devices might not display certain Japanese characters correctly." },
      { q: "How do I copy these text faces?", a: "Simply click or tap on any Kaomoji card in our grid. It will automatically be copied to your clipboard." },
      { q: "Can I use these on Discord and Twitch?", a: "Yes! Kaomoji are extremely popular on Discord and Twitch because they don't require nitro or special permissions to use." },
      { q: "What does (╯°□°)╯︵ ┻━┻ mean?", a: "This is the famous 'Table Flip' Kaomoji. It represents anger or frustration, as if someone is flipping a table over." },
      { q: "Are these free to use?", a: "Yes, all Kaomoji in our library are completely free to copy and use anywhere you like." }
    ],
    keywords: ["Kaomoji", "Japanese Emoticons", "Text Faces", "Lenny Face", "Cute Text Symbols", "Discord Emotes", "Twitch Chat Faces", "Table Flip Text", "Shrug Emoji Text", "Dongers", "ASCII Art", "Anime Emoticons"]
  },
  translit: {
    appTitle: "EmojiVerse - SEO Transliteration & Slug Generator",
    metaDescription: "Convert Cyrillic and international text to SEO-friendly Latin URLs. Supports Google and Yandex transliteration standards for webmasters.",
    mainHeading: "SEO URL & Transliteration Tool",
    subHeading: "Generate clean, SEO-optimized URLs for your articles and pages instantly.",
    aboutTitle: "More Than Just Translation",
    aboutText: [
      "In the world of SEO (Search Engine Optimization), the structure of your URL matters. Search engines like Google and Yandex prefer URLs that are readable and use Latin characters. Our **SEO Translit Tool** helps you convert titles from any language into clean, SEO-friendly slugs.",
      "We support two major standards: **Google (ISO-9)** and **Yandex**. This is crucial because different search engines handle transliteration differently. For example, the letter 'щ' might become 'shch' for Google but 'sch' for Yandex.",
      "This tool is essential for bloggers, developers, and content creators who want to ensure their international content ranks well globally. Just type your title, and we generate the valid URL slug automatically."
    ],
    faqTitle: "SEO Questions",
    faqIntro: "Understanding URL transliteration and search engine optimization.",
    faq: [
      { q: "Why do I need to transliterate my URLs?", a: "Readable URLs (slugs) are a ranking factor for SEO. Transliteration ensures your non-English titles are readable by search engines worldwide." },
      { q: "What is the difference between Google and Yandex translit?", a: "Yandex has specific rules for Russian characters to ensure better local ranking in Russia. Google uses a more international ISO standard." },
      { q: "What is a URL Slug?", a: "A slug is the part of a URL that identifies a particular page on a website in an easy-to-read form. Example: /my-article-title." },
      { q: "Does this tool remove special characters?", a: "Yes, our generator automatically removes punctuation, special symbols, and emojis, keeping only safe characters for URLs." },
      { q: "Can I use this for file names too?", a: "Absolutely. Transliterated names are perfect for file uploads (images, PDFs) to ensure server compatibility." },
      { q: "Is it better to use English or Translit?", a: "If your content is in a local language (e.g., Russian), transliteration is often better than translation because users search using local phonetics." }
    ],
    keywords: ["Translit Generator", "SEO Slug Maker", "URL Converter", "Cyrillic to Latin", "Yandex SEO", "Google Friendly URLs", "Slugify Online", "Transliteration Tool", "Russian to English SEO", "Webmaster Tools", "Link Generator", "Clean URLs"]
  },
  capslock: {
    appTitle: "EmojiVerse - Case Converter & Caps Lock Fixer",
    metaDescription: "Convert text case instantly. Switch between UPPERCASE, lowercase, Title Case, Sentence case, and Alternating case online.",
    mainHeading: "The Ultimate Case Converter",
    subHeading: "Fix accidental Caps Lock and format your text styles in seconds.",
    aboutTitle: "More Than Just A Case Converter",
    aboutText: [
      "Have you ever typed a whole paragraph only to realize you left **Caps Lock** on? Don't delete it! Our **Case Converter** tool is designed to fix text formatting issues instantly without rewriting a single word.",
      "We offer advanced transformation modes beyond just upper and lower case. **Title Case** is perfect for headlines, ensuring every major word is capitalized. **Alternating Case** (aLtErNaTiNg) is popular in meme culture and social media banter.",
      "This tool is invaluable for writers, students, and developers who need to clean up text data or format headings consistentl. It handles formatting logic that standard text editors often miss."
    ],
    faqTitle: "Formatting Questions",
    faqIntro: "Tips on using the case converter for your text.",
    faq: [
      { q: "What is Title Case?", a: "Title Case capitalizes the first letter of every major word in a sentence. It is the standard for book titles, headlines, and movie names." },
      { q: "How do I fix text typed with Caps Lock?", a: "Simply paste your text into our tool and click 'Sentence case'. It will automatically convert it to normal sentence structure." },
      { q: "What is Alternating Case used for?", a: "Alternating Case (lIkE tHiS) is often used in internet memes to convey a mocking or sarcastic tone (SpongeBob meme style)." },
      { q: "Does this affect numbers or punctuation?", a: "No, our converter only changes alphabetic characters. Numbers and punctuation marks remain exactly as they are." },
      { q: "Can I convert text to 'Inverse Case'?", a: "Yes! Inverse case flips every letter. If it was Upper, it becomes Lower, and vice versa. Great for correcting mixed-case typing errors." },
      { q: "Is there a limit to how much text I can convert?", a: "Practically, no. You can paste entire essays or articles and convert them instantly in your browser." }
    ],
    keywords: ["Case Converter", "Caps Lock Fixer", "Title Case Generator", "Uppercase to Lowercase", "Sentence Case Tool", "Text Formatter", "Alternating Case", "Meme Text Generator", "Convert String", "Word Capitalizer", "Change Text Case", "Online Text Tool"]
  }
};

const RU_CONTENT: TabData = {
  emoji: {
    appTitle: "EmojiVerse - Счетчик Слов, Символов и Эмодзи",
    metaDescription: "Бесплатный онлайн редактор. Счетчик слов и символов, проверка лимитов Инстаграм, красивые шрифты и коллекция эмодзи.",
    mainHeading: "Ваш Идеальный Текстовый Редактор",
    subHeading: "Печатайте, считайте слова, меняйте шрифты и находите эмодзи мгновенно.",
    aboutTitle: "Больше, чем просто смайлики",
    aboutText: [
      "Добро пожаловать в EmojiVerse — вашу универсальную творческую студию для социальных сетей. Мы начинали как библиотека эмодзи, но поняли, что авторам контента нужно больше. Поэтому мы создали мощный текстовый редактор прямо в браузере.",
      "Пишете ли вы пост для Instagram, статью в блог или сообщение в Telegram — объем имеет значение. Наш встроенный **Счетчик Слов** и **Счетчик Символов** работают в реальном времени. Мы также добавили специальный **Индикатор лимита Instagram** (2200 знаков), чтобы ваш текст никогда не обрезался на самом интересном месте.",
      "Мы стираем языковые барьеры. Наш умный поиск позволяет находить эмодзи, вводя слова на русском, английском и еще 12 языках. А с новой функцией «Instagram Шрифты» вы можете превратить скучный текст в жирный, курсив или готический, чтобы выделить свой профиль."
    ],
    faqTitle: "Часто задаваемые вопросы",
    faqIntro: "Всё, что нужно знать о работе с текстом, счетчиками и нашей библиотекой.",
    faq: [
      { q: "Есть ли здесь счетчик слов и символов?", a: "Да! EmojiVerse — это полноценный инструмент для подсчета слов и знаков. Посмотрите на панель статистики над списком эмодзи." },
      { q: "Как работает проверка лимита Instagram?", a: "В постах Instagram есть ограничение в 2200 символов. Наш инструмент содержит индикатор «IG Limit», который ведет обратный отсчет." },
      { q: "Это бесплатно?", a: "Абсолютно. EmojiVerse на 100% бесплатен. Мы не требуем регистрации и не вводим скрытых платежей." },
      { q: "Могу ли я искать эмодзи на русском языке?", a: "Да, это наша гордость. Вы можете вводить запросы на русском (например, «кот», «улыбка», «флаг»), и наша система поймет вас, даже если интерфейс включен на другом языке." },
      { q: "Сохраняется ли мой текст?", a: "Мы заботимся о приватности и не сохраняем ваш текст на наших серверах. Мы используем память браузера только для истории." },
      { q: "Как изменить шрифт для Инстаграм?", a: "Нажмите кнопку «Шрифты Инстаграм» (или волшебную палочку). Откроется меню, где вы сможете выбрать стиль." },
      { q: "Работает ли это на телефоне?", a: "Да, EmojiVerse работает как приложение (PWA). Оно отлично адаптировано для iPhone и Android." },
      { q: "Можно ли скопировать сразу много смайлов?", a: "Конечно. Вы можете составить целое предложение или узор из смайлов в редакторе." },
      { q: "Какие браузеры поддерживаются?", a: "Мы поддерживаем все современные браузеры: Chrome, Safari, Yandex Browser, Firefox и Opera." },
      { q: "Зачем это нужно, если есть клавиатура в телефоне?", a: "Клавиатура телефона мала. EmojiVerse дает полный обзор всех категорий на одном экране." }
    ],
    keywords: ["Счетчик слов", "Счетчик символов", "Символы для инстаграм", "Лимит знаков инстаграм", "Эмодзи клавиатура", "Красивые шрифты", "Жирный шрифт инстаграм", "Посчитать слова онлайн", "Редактор постов", "Копировать смайлики", "Генератор шрифтов", "Инстаграм био"]
  },
  kaomoji: {
    appTitle: "EmojiVerse - Библиотека Каомодзи и Японских Смайлов",
    metaDescription: "Огромная коллекция японских каомодзи и текстовых смайликов. Копируйте милые, грустные и веселые лица для Discord и ВК.",
    mainHeading: "Японские Каомодзи и Текстовые Лица",
    subHeading: "Выражайте эмоции с помощью тысяч милых японских смайликов.",
    aboutTitle: "Больше, чем просто текстовые лица",
    aboutText: [
      "Каомодзи (顔文字) — это популярный стиль японских смайликов, состоящих из символов и знаков препинания. В отличие от обычных эмодзи-картинок, каомодзи создаются текстом, поэтому они работают на любой платформе.",
      "Наша **Библиотека Каомодзи** содержит отборные смайлы, популярные в интернете. От классического «Пожимания плечами» ¯\\_(ツ)_/¯ до «Переворачивания стола» (╯°□°)╯︵ ┻━┻.",
      "Эти смайлы идеально подходят для **Discord**, **ВКонтакте** и **Telegram**, если вы хотите выделиться. Просто нажмите на любой каомодзи, чтобы скопировать его."
    ],
    faqTitle: "Вопросы о Каомодзи",
    faqIntro: "Узнайте больше о том, как использовать японские смайлы.",
    faq: [
      { q: "В чем разница между Эмодзи и Каомодзи?", a: "Эмодзи — это картинки (😊). Каомодзи — это текст и символы ((^ _ ^)), которые складываются в лицо." },
      { q: "Работают ли они на всех устройствах?", a: "Большинство современных устройств поддерживают их. Некоторые старые телефоны могут не отображать редкие японские символы." },
      { q: "Как скопировать эти лица?", a: "Просто нажмите на любую карточку с каомодзи. Он автоматически скопируется в буфер обмена." },
      { q: "Можно ли использовать их в Discord?", a: "Да! Каомодзи очень популярны в Discord, так как для них не нужны платные подписки Nitro." },
      { q: "Что значит (╯°□°)╯︵ ┻━┻?", a: "Это знаменитый смайл, переворачивающий стол. Он символизирует ярость или разочарование." },
      { q: "Это бесплатно?", a: "Да, все каомодзи в нашей библиотеке полностью бесплатны для использования." }
    ],
    keywords: ["Каомодзи", "Японские смайлы", "Текстовые лица", "Смайлы из символов", "Discord смайлы", "Аниме смайлики", "Ленни фейс", "Перевернуть стол", "Смайл пожимает плечами", "ASCII арт", "Смайлики для ВК", "Красивые символы"]
  },
  translit: {
    appTitle: "EmojiVerse - SEO Транслитерация и Генератор URL",
    metaDescription: "Перевод кириллицы в латиницу для SEO. Генератор правильных ссылок (ЧПУ) по стандартам Яндекс и Google.",
    mainHeading: "SEO Транслит и Генератор Ссылок",
    subHeading: "Создавайте чистые, оптимизированные URL для ваших статей мгновенно.",
    aboutTitle: "Больше, чем просто перевод",
    aboutText: [
      "В мире SEO структура вашего URL имеет значение. Поисковые системы, такие как Яндекс и Google, предпочитают ссылки на латинице. Наш **Инструмент Транслитерации** помогает перевести заголовки в правильный формат (ЧПУ).",
      "Мы поддерживаем два главных стандарта: **Google (ISO-9)** и **Яндекс**. Это важно, так как поисковики по-разному читают транслит. Например, буква «щ» может стать «shch» или «sch».",
      "Этот инструмент незаменим для блогеров, разработчиков и SEO-специалистов. Просто введите заголовок, и мы создадим валидный URL автоматически."
    ],
    faqTitle: "Вопросы по SEO",
    faqIntro: "Понимание транслитерации и оптимизации ссылок.",
    faq: [
      { q: "Зачем нужна транслитерация ссылок?", a: "Читаемые ссылки (ЧПУ) — фактор ранжирования. Транслит делает русские заголовки понятными для мировых поисковых систем." },
      { q: "В чем разница между Google и Яндекс транслитом?", a: "У Яндекса есть свои правила для русских букв, чтобы лучше ранжироваться в Рунете. Google использует международные стандарты." },
      { q: "Что такое слаг (slug)?", a: "Слаг — это часть URL-адреса, которая идентифицирует страницу. Пример: /moia-statya." },
      { q: "Инструмент удаляет спецсимволы?", a: "Да, наш генератор автоматически удаляет запятые, кавычки и эмодзи, оставляя только безопасные символы." },
      { q: "Можно ли использовать для имен файлов?", a: "Конечно. Транслит идеален для названий картинок и документов на сервере." },
      { q: "Что лучше: английский перевод или транслит?", a: "Для русскоязычного контента транслит (naprimer-tak) часто лучше, так как пользователи ищут, используя русскую фонетику." }
    ],
    keywords: ["Транслит онлайн", "Генератор ЧПУ", "Перевод в транслит", "Кириллица в латиницу", "SEO ссылки", "Яндекс транслит", "Google транслитерация", "Создание slug", "Транслит для сайта", "Инструменты вебмастера", "Правильные ссылки", "URL конвертер"]
  },
  capslock: {
    appTitle: "EmojiVerse - Конвертер Регистра и Caps Lock",
    metaDescription: "Мгновенная смена регистра текста. Перевод в ВЕРХНИЙ, нижний, Заглавный и Чередующийся регистр онлайн.",
    mainHeading: "Универсальный Конвертер Регистра",
    subHeading: "Исправьте случайный Caps Lock и отформатируйте текст за секунды.",
    aboutTitle: "Больше, чем просто смена букв",
    aboutText: [
      "Случайно набрали целый абзац с включенным **Caps Lock**? Не удаляйте его! Наш **Конвертер Регистра** исправит текст мгновенно, не требуя переписывания.",
      "Мы предлагаем продвинутые режимы. **Заглавный Регистр** идеален для заголовков. **Чередующийся Регистр** (пРиМеР тЕкСтА) популярен в мемах и соцсетях.",
      "Этот инструмент незаменим для редакторов, студентов и программистов, которым нужно быстро привести текст в порядок."
    ],
    faqTitle: "Вопросы о форматировании",
    faqIntro: "Советы по использованию конвертера регистра.",
    faq: [
      { q: "Что такое Титульный Регистр (Title Case)?", a: "В этом режиме первая буква каждого слова становится заглавной. Это стандарт для заголовков статей и книг." },
      { q: "Как исправить текст с Caps Lock?", a: "Вставьте текст в редактор и нажмите «Sentence case» (Как в предложении). Он станет нормальным." },
      { q: "Зачем нужен Чередующийся Регистр?", a: "Чередующийся (вОт тАк) часто используется в мемах (например, Губка Боб) для передачи сарказма." },
      { q: "Влияет ли это на цифры?", a: "Нет, конвертер меняет только буквы. Цифры и знаки препинания остаются на месте." },
      { q: "Что такое Инверсия?", a: "Инверсия переворачивает регистр: большие буквы становятся маленькими и наоборот. Удобно для исправления ошибок набора." },
      { q: "Есть ли лимит на объем текста?", a: "Практически нет. Вы можете вставить целую статью и отформатировать её мгновенно." }
    ],
    keywords: ["Конвертер регистра", "Исправить капс лок", "Сделать буквы маленькими", "Заглавные буквы", "Текст для мемов", "Изменить регистр онлайн", "Форматирование текста", "Чередующийся текст", "Инверсия регистра", "Все заглавные", "Редактор текста", "Онлайн инструменты"]
  }
};

const ES_CONTENT: TabData = {
  emoji: {
    appTitle: "EmojiVerse - Contador de Palabras y Emojis",
    metaDescription: "Selector de emojis online gratis, contador de palabras y caracteres. Verifica límites de Instagram, copia emojis y da formato al texto.",
    mainHeading: "El Editor de Texto y Emojis Definitivo",
    subHeading: "Escribe, cuenta palabras, cambia fuentes y encuentra emojis en cualquier idioma.",
    aboutTitle: "Más que simples emojis",
    aboutText: [
      "Bienvenido a EmojiVerse, tu espacio creativo todo en uno. Comenzamos como una biblioteca de emojis, pero nos dimos cuenta de que los creadores necesitaban más. Por eso creamos una potente suite de edición de texto.",
      "Ya sea para Instagram, Twitter o un blog, la precisión importa. Nuestro **Contador de Palabras** y **Caracteres** funciona en tiempo real. Incluimos un verificador de **Límite de Instagram** (2.200 caracteres) para que nunca te corten.",
      "Rompemos barreras. Nuestro motor de búsqueda encuentra emojis en más de 13 idiomas. Además, con 'Fuentes Mágicas', puedes transformar texto en negrita o cursiva."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqIntro: "Todo lo que necesitas saber sobre nuestras herramientas.",
    faq: [
      { q: "¿Esta herramienta cuenta palabras?", a: "¡Sí! EmojiVerse es un contador completo. La barra de estadísticas se actualiza al instante." },
      { q: "¿Cómo funciona el límite de Instagram?", a: "El indicador 'IG Limit' cuenta regresivamente desde 2.200 caracteres y te avisa si te pasas." },
      { q: "¿Es totalmente gratuito?", a: "Sí, 100% gratuito, sin registro ni tasas ocultas." },
      { q: "¿Puedo buscar emojis en español?", a: "Sí, puedes escribir palabras clave en español y nuestro sistema te entenderá." },
      { q: "¿Guardan mi texto?", a: "No, por privacidad no guardamos tu texto en servidores. Solo usamos el almacenamiento local para favoritos." },
      { q: "¿Cómo cambio la fuente?", a: "Haz clic en 'Fuentes Instagram' (varita mágica) para elegir estilos como Negrita o Gótico." },
      { q: "¿Funciona en móviles?", a: "Sí, es una Web App Progresiva (PWA) optimizada para iPhone y Android." },
      { q: "¿Puedo copiar varios emojis?", a: "Sí. Puedes crear frases enteras en el editor y copiarlas de una vez." },
      { q: "¿Qué navegadores soportan?", a: "Soportamos todos los navegadores modernos: Chrome, Safari, Firefox, Edge." },
      { q: "¿Por qué usar esto y no el teclado?", a: "El teclado es limitado. EmojiVerse ofrece pantalla completa, conteo de caracteres y fuentes especiales." }
    ],
    keywords: ["Contador de palabras", "Contador de caracteres", "Límite Instagram", "Editor de texto online", "Teclado Emoji", "Fuentes para Instagram", "Letras bonitas", "Generador de fuentes", "Copiar pegar emojis", "Emojis para bio", "Caracteres unicode", "Leyendas para fotos"]
  },
  kaomoji: {
    appTitle: "EmojiVerse - Biblioteca de Kaomojis y Emoticonos",
    metaDescription: "Gran colección de Kaomojis japoneses y caras de texto. Copia emoticonos lindos, tristes y enojados para Discord y TikTok.",
    mainHeading: "Kaomojis Japoneses y Caras de Texto",
    subHeading: "Exprésate con miles de emoticonos japoneses basados en texto.",
    aboutTitle: "Más que caras de texto",
    aboutText: [
      "Los Kaomoji (顔文字) son emoticonos japoneses hechos de caracteres y puntuación. A diferencia de los emojis normales, los Kaomoji son texto, por lo que funcionan en cualquier plataforma.",
      "Nuestra **Biblioteca Kaomoji** tiene los más populares de internet. Desde el clásico 'Encogerse de hombros' ¯\\_(ツ)_/¯ hasta 'Voltear la mesa' (╯°□°)╯︵ ┻━┻.",
      "Perfectos para **Discord**, **Twitch** y **TikTok**. Simplemente haz clic para copiar."
    ],
    faqTitle: "Preguntas sobre Kaomoji",
    faqIntro: "Aprende más sobre estos emoticonos.",
    faq: [
      { q: "¿Diferencia entre Emoji y Kaomoji?", a: "Los emojis son imágenes (😊). Los Kaomoji son texto ((^ _ ^))." },
      { q: "¿Funcionan en todos los dispositivos?", a: "La mayoría de dispositivos modernos los soportan sin problemas." },
      { q: "¿Cómo los copio?", a: "Haz clic en cualquier tarjeta de Kaomoji y se copiará automáticamente." },
      { q: "¿Sirven para Discord?", a: "¡Sí! Son muy populares en Discord y no requieren Nitro." },
      { q: "¿Qué significa (╯°□°)╯︵ ┻━┻?", a: "Es una persona volteando una mesa por frustración o ira." },
      { q: "¿Son gratis?", a: "Sí, totalmente gratuitos para usar donde quieras." }
    ],
    keywords: ["Kaomoji", "Emoticonos japoneses", "Caras de texto", "Lenny Face", "Símbolos lindos", "Emotes Discord", "Caras para Twitch", "Voltear mesa", "Arte ASCII", "Emoticonos anime", "Texto kawaii", "Símbolos de texto"]
  },
  translit: {
    appTitle: "EmojiVerse - Transliteración SEO y Generador de URL",
    metaDescription: "Convierte texto a URLs latinas amigables con SEO. Soporta estándares de Google y Yandex.",
    mainHeading: "Herramienta de Transliteración SEO",
    subHeading: "Genera URLs limpias y optimizadas para tus artículos al instante.",
    aboutTitle: "Más que traducción",
    aboutText: [
      "En el SEO, la estructura de la URL importa. Los buscadores prefieren caracteres latinos. Nuestra herramienta convierte títulos de cualquier idioma en slugs limpios.",
      "Soportamos estándares **Google (ISO-9)** y **Yandex**. Es crucial para que tu contenido internacional posicione bien.",
      "Esencial para bloggers y desarrolladores. Escribe tu título y obtén la URL válida."
    ],
    faqTitle: "Preguntas SEO",
    faqIntro: "Entendiendo la transliteración de URLs.",
    faq: [
      { q: "¿Por qué transliterar URLs?", a: "Las URLs legibles ayudan al SEO. La transliteración hace que los títulos sean legibles globalmente." },
      { q: "¿Diferencia entre Google y Yandex?", a: "Yandex tiene reglas específicas para caracteres cirílicos. Google usa un estándar más internacional." },
      { q: "¿Qué es un Slug?", a: "La parte de la URL que identifica una página. Ejemplo: /mi-articulo." },
      { q: "¿Elimina caracteres especiales?", a: "Sí, elimina puntuación y emojis automáticamente." },
      { q: "¿Sirve para nombres de archivos?", a: "Sí, es perfecto para nombrar imágenes y documentos para servidores." },
      { q: "¿Mejor inglés o transliteración?", a: "Para contenido local, la transliteración suele ser mejor porque conserva la fonética original." }
    ],
    keywords: ["Generador Translit", "Creador de Slugs", "Convertidor URL", "Cirílico a Latino", "SEO Yandex", "URLs amigables", "Slugify Online", "Herramienta SEO", "Webmaster", "Generador de enlaces", "URLs limpias", "Optimización URL"]
  },
  capslock: {
    appTitle: "EmojiVerse - Convertidor de Mayúsculas",
    metaDescription: "Cambia mayúsculas y minúsculas al instante. Convierte a Título, Oración o Alternado online.",
    mainHeading: "El Convertidor de Texto Definitivo",
    subHeading: "Arregla el bloqueo de mayúsculas y da formato a tu texto en segundos.",
    aboutTitle: "Más que cambiar letras",
    aboutText: [
      "¿Escribiste todo con **Bloq Mayús** activado? ¡No lo borres! Nuestro convertidor lo arregla al instante.",
      "Ofrecemos modos avanzados como **Tipo Título** para encabezados o **Alternado** (aLtErNaDo) para memes.",
      "Indispensable para escritores y estudiantes para limpiar textos rápidamente."
    ],
    faqTitle: "Preguntas de Formato",
    faqIntro: "Consejos sobre el uso del convertidor.",
    faq: [
      { q: "¿Qué es Tipo Título?", a: "Pone en mayúscula la primera letra de cada palabra importante." },
      { q: "¿Cómo arreglo el Bloq Mayús?", a: "Pega el texto y usa 'Tipo Oración'. Se arreglará solo." },
      { q: "¿Para qué sirve el Texto Alternado?", a: "Se usa mucho en memes (como Bob Esponja) para denotar sarcasmo." },
      { q: "¿Afecta a los números?", a: "No, solo cambia las letras del alfabeto." },
      { q: "¿Qué es el Caso Inverso?", a: "Invierte las mayúsculas a minúsculas y viceversa." },
      { q: "¿Hay límite de texto?", a: "No, puedes convertir artículos enteros." }
    ],
    keywords: ["Convertidor mayúsculas", "Arreglar bloq mayús", "Pasar a minúsculas", "Letras capitales", "Texto para memes", "Cambiar caja texto", "Formatear texto", "Texto alternado", "Invertir texto", "Todo mayúsculas", "Editor online", "Herramientas de texto"]
  }
};

const SEO_CONTENT: Record<string, TabData> = {
  en: EN_CONTENT,
  ru: RU_CONTENT,
  es: ES_CONTENT,
  // Default mapping for other languages to English structure to prevent crashes
  // In a full production app, these would be translated individually.
  fr: EN_CONTENT, de: EN_CONTENT, it: EN_CONTENT, pt: EN_CONTENT, 
  zh: EN_CONTENT, ja: EN_CONTENT, ko: EN_CONTENT, ar: EN_CONTENT, 
  hi: EN_CONTENT, kk: EN_CONTENT
};

// Helper to get SEO data based on Locale AND Tab
export const getSEOData = (locale: Locale, tab: 'emoji' | 'kaomoji' | 'translit' | 'capslock'): SEOData => {
  const locData = SEO_CONTENT[locale] || SEO_CONTENT['en'];
  return locData[tab] || locData['emoji'];
};

export { SEO_CONTENT };