import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const IMAGES = {
  hero: 'https://cdn.poehali.dev/projects/c169ed51-120b-4ab9-a9b4-2e655519ed15/files/60fdb7fb-8233-40a4-bab7-8c6742a0329a.jpg',
  sea: 'https://cdn.poehali.dev/projects/c169ed51-120b-4ab9-a9b4-2e655519ed15/files/62929454-9dc9-41ac-98a7-e9d38efa45c0.jpg',
  street: 'https://cdn.poehali.dev/projects/c169ed51-120b-4ab9-a9b4-2e655519ed15/files/00d78c64-7afc-4de8-8036-9173074d4701.jpg',
  vineyards: 'https://cdn.poehali.dev/projects/c169ed51-120b-4ab9-a9b4-2e655519ed15/files/5c9b102e-f29d-46a7-b085-ac6060786f54.jpg',
};

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О городе' },
  { id: 'sights', label: 'Достопримечательности' },
  { id: 'hotels', label: 'Отели' },
  { id: 'routes', label: 'Маршруты' },
  { id: 'gallery', label: 'Галерея' },
];

const SIGHTS = [
  { icon: '🏛️', name: 'Триумфальная арка', desc: 'Символ победы и мощи Кубанского казачества, главная архитектурная визитка города', tag: 'История' },
  { icon: '🎭', name: 'Краснодарский краевой театр', desc: 'Один из старейших театров юга России с богатейшим репертуаром', tag: 'Культура' },
  { icon: '🌿', name: 'Чистяковская роща', desc: 'Главный парк города — место для прогулок и отдыха в сердце мегаполиса', tag: 'Природа' },
  { icon: '⚽', name: 'Стадион «Краснодар»', desc: 'Ультрасовременная арена клуба «Краснодар» — одна из лучших в России', tag: 'Спорт' },
  { icon: '🎨', name: 'Музей Коваленко', desc: 'Старейший художественный музей Северного Кавказа с богатейшей коллекцией', tag: 'Искусство' },
  { icon: '🛍️', name: 'Красная улица', desc: 'Главная пешеходная артерия города с кафе, магазинами и атмосферой юга', tag: 'Шоппинг' },
];

const HOTELS = [
  { name: 'Hilton Garden Inn', stars: 4, price: 'от 7 500 ₽', desc: 'Комфортный отель в деловом центре, рядом с ТЦ', img: '🏨', tag: 'Деловой' },
  { name: 'Marriott Краснодар', stars: 5, price: 'от 12 000 ₽', desc: 'Роскошный пятизвёздочный отель с панорамным видом', img: '🌟', tag: 'Люкс' },
  { name: 'Вилла Панорама', stars: 4, price: 'от 5 500 ₽', desc: 'Уютный бутик-отель с видом на реку Кубань', img: '🏡', tag: 'Бутик' },
  { name: 'Ibis Краснодар Центр', stars: 3, price: 'от 3 200 ₽', desc: 'Практичный выбор в самом центре города', img: '🏩', tag: 'Бюджет' },
];

const ROUTES = [
  {
    title: 'Исторический центр',
    duration: '3 часа',
    distance: '4 км',
    icon: '🏛️',
    color: 'from-orange-500 to-red-500',
    stops: ['Триумфальная арка', 'Красная улица', 'Городской сад', 'Кафедральный собор'],
  },
  {
    title: 'Парки и природа',
    duration: '4 часа',
    distance: '6 км',
    icon: '🌿',
    color: 'from-green-500 to-emerald-600',
    stops: ['Чистяковская роща', 'Парк «Солнечный остров»', 'Набережная Кубани', 'Ботанический сад'],
  },
  {
    title: 'Гастрономический тур',
    duration: '5 часов',
    distance: '3 км',
    icon: '🍷',
    color: 'from-amber-500 to-yellow-500',
    stops: ['Рынок «Центральный»', 'Кубанские винодельни', 'Ресторан казачьей кухни', 'Крафтовые пивоварни'],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'text-krd-gold' : 'text-gray-300'}>★</span>
      ))}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryActive, setGalleryActive] = useState<number | null>(null);
  const heroSection = useInView();
  const aboutSection = useInView();
  const sightsSection = useInView();
  const hotelsSection = useInView();
  const routesSection = useInView();
  const gallerySection = useInView();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'sights', 'hotels', 'routes', 'gallery'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-krd-light font-golos overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-krd-navy/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <span className="text-2xl font-oswald font-bold text-white tracking-wider">
              КРАСНО<span className="text-krd-orange">ДАР</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-white/80 hover:text-krd-orange ${activeSection === item.id ? 'active text-krd-orange' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-krd-navy border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-left text-white/80 hover:text-krd-orange py-1 ${activeSection === item.id ? 'text-krd-orange' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-krd-navy/70 via-krd-navy/50 to-krd-navy/80" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-krd-orange/10 blur-3xl animate-hero-float" />
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 rounded-full bg-krd-gold/10 blur-2xl animate-hero-float delay-300" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16">
          <div ref={heroSection.ref} className={heroSection.inView ? 'animate-fade-in-up' : 'opacity-0-init'}>
            <span className="inline-block bg-krd-orange/20 border border-krd-orange/40 text-krd-gold px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase mb-6">
              Туристический гид
            </span>
          </div>

          <h1
            className={`font-oswald font-bold text-white leading-none mb-6 ${heroSection.inView ? 'animate-fade-in-up delay-100' : 'opacity-0-init'}`}
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            СЕРДЦЕ<br />
            <span className="text-krd-orange">ЮГА</span> РОСИИ
          </h1>

          <p className={`text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${heroSection.inView ? 'animate-fade-in-up delay-200' : 'opacity-0-init'}`}>
            Краснодар — город, где казачья история встречается с современностью,
            а тёплый климат создаёт особую атмосферу юга
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${heroSection.inView ? 'animate-fade-in-up delay-300' : 'opacity-0-init'}`}>
            <button
              onClick={() => scrollTo('sights')}
              className="bg-krd-orange hover:bg-orange-600 text-white font-oswald font-semibold px-8 py-4 rounded-xl text-lg tracking-wider uppercase transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30"
            >
              Исследовать город
            </button>
            <button
              onClick={() => scrollTo('gallery')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-oswald font-semibold px-8 py-4 rounded-xl text-lg tracking-wider uppercase transition-all hover:scale-105 backdrop-blur-sm"
            >
              Смотреть галерею
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-krd-navy/90 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { num: '+1 млн', label: 'туристов в год' },
              { num: '300+', label: 'достопримечательностей' },
              { num: '26°C', label: 'средняя температура' },
              { num: '1793', label: 'год основания' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-oswald text-2xl font-bold text-krd-orange">{stat.num}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-krd-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={aboutSection.ref}>
              <span className="text-krd-orange font-oswald font-semibold tracking-widest uppercase text-sm">О городе</span>
              <h2 className={`font-oswald font-bold text-krd-navy text-5xl md:text-6xl mt-3 mb-6 leading-tight ${aboutSection.inView ? 'animate-fade-in-left' : 'opacity-0-init'}`}>
                КАЗАЧЬЯ<br /><span className="text-krd-orange">СТОЛИЦА</span>
              </h2>
              <p className={`text-gray-600 text-lg leading-relaxed mb-6 ${aboutSection.inView ? 'animate-fade-in-up delay-200' : 'opacity-0-init'}`}>
                Краснодар — крупнейший город Северного Кавказа и столица Краснодарского края.
                Основанный в 1793 году как крепость Екатеринодар, сегодня он является
                одним из самых динамично развивающихся городов России.
              </p>
              <p className={`text-gray-600 text-lg leading-relaxed mb-8 ${aboutSection.inView ? 'animate-fade-in-up delay-300' : 'opacity-0-init'}`}>
                Благодатный климат, богатая кухня и близость к Чёрному морю делают
                Краснодар идеальной точкой для путешествия по югу страны.
              </p>
              <div className={`flex flex-wrap gap-3 ${aboutSection.inView ? 'animate-fade-in-up delay-400' : 'opacity-0-init'}`}>
                {['🌞 Южный климат', '🏇 Казачья культура', '🍷 Кубанское вино', '🎭 Театры и музеи'].map(tag => (
                  <span key={tag} className="bg-krd-orange/10 text-krd-orange border border-krd-orange/20 px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 ${aboutSection.inView ? 'animate-scale-in delay-200' : 'opacity-0-init'}`}>
              <div className="gallery-item rounded-2xl aspect-[3/4] overflow-hidden shadow-xl">
                <img src={IMAGES.street} alt="Красная улица" className="w-full h-full object-cover" />
                <div className="overlay" />
              </div>
              <div className="flex flex-col gap-4 pt-8">
                <div className="gallery-item rounded-2xl aspect-square overflow-hidden shadow-xl">
                  <img src={IMAGES.vineyards} alt="Виноградники" className="w-full h-full object-cover" />
                  <div className="overlay" />
                </div>
                <div className="bg-krd-navy rounded-2xl p-5 text-white flex flex-col gap-2">
                  <span className="text-krd-gold font-oswald text-3xl font-bold">900+</span>
                  <span className="text-white/70 text-sm">тысяч жителей</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-krd-orange py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(null).flatMap((_, ai) =>
            ['КРАСНОДАР', 'КУБАНЬ', 'SOUTH OF RUSSIA', 'КАЗАЧЬЯ СТОЛИЦА', 'ГОРОД СОЛНЦА', '★'].map((text, i) => (
              <span key={`${ai}-${i}`} className="font-oswald font-bold text-white/80 text-xl tracking-widest uppercase mx-8">
                {text}
              </span>
            ))
          )}
        </div>
      </div>

      {/* SIGHTS */}
      <section id="sights" className="py-24 bg-krd-light">
        <div className="container mx-auto px-6">
          <div ref={sightsSection.ref} className="text-center mb-16">
            <span className="text-krd-orange font-oswald font-semibold tracking-widest uppercase text-sm">Куда сходить</span>
            <h2 className={`font-oswald font-bold text-krd-navy text-5xl md:text-6xl mt-3 ${sightsSection.inView ? 'animate-fade-in-up' : 'opacity-0-init'}`}>
              ДОСТОПРИМЕЧАТЕЛЬНОСТИ
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIGHTS.map((sight, i) => (
              <div
                key={sight.name}
                className={`bg-white rounded-2xl p-6 card-hover shadow-sm border border-gray-100 ${sightsSection.inView ? `animate-fade-in-up delay-${(i % 4 + 1) * 100}` : 'opacity-0-init'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{sight.icon}</span>
                  <span className="bg-krd-orange/10 text-krd-orange text-xs font-semibold px-3 py-1 rounded-full">{sight.tag}</span>
                </div>
                <h3 className="font-oswald font-bold text-krd-navy text-xl mb-2">{sight.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sight.desc}</p>
                <button className="mt-4 text-krd-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Подробнее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOTELS */}
      <section id="hotels" className="py-24 bg-krd-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-krd-orange/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-krd-gold/10 rounded-full blur-2xl translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div ref={hotelsSection.ref} className="text-center mb-16">
            <span className="text-krd-gold font-oswald font-semibold tracking-widest uppercase text-sm">Где остановиться</span>
            <h2 className={`font-oswald font-bold text-white text-5xl md:text-6xl mt-3 ${hotelsSection.inView ? 'animate-fade-in-up' : 'opacity-0-init'}`}>
              ЛУЧШИЕ <span className="text-krd-orange">ОТЕЛИ</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOTELS.map((hotel, i) => (
              <div
                key={hotel.name}
                className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 card-hover ${hotelsSection.inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0-init'}`}
              >
                <div className="text-4xl mb-4">{hotel.img}</div>
                <span className="text-krd-orange text-xs font-semibold uppercase tracking-wider">{hotel.tag}</span>
                <h3 className="font-oswald font-bold text-white text-lg mt-1 mb-1">{hotel.name}</h3>
                <Stars count={hotel.stars} />
                <p className="text-white/50 text-sm mt-3 mb-4 leading-relaxed">{hotel.desc}</p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-krd-gold font-oswald font-bold text-lg">{hotel.price}</span>
                  <button className="bg-krd-orange hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section id="routes" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div ref={routesSection.ref} className="text-center mb-16">
            <span className="text-krd-orange font-oswald font-semibold tracking-widest uppercase text-sm">Как гулять</span>
            <h2 className={`font-oswald font-bold text-krd-navy text-5xl md:text-6xl mt-3 ${routesSection.inView ? 'animate-fade-in-up' : 'opacity-0-init'}`}>
              МАРШРУТЫ
            </h2>
            <p className={`text-gray-500 mt-4 max-w-xl mx-auto ${routesSection.inView ? 'animate-fade-in-up delay-200' : 'opacity-0-init'}`}>
              Готовые маршруты по Краснодару и окрестностям — от исторического центра до винодельческих регионов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ROUTES.map((route, i) => (
              <div
                key={route.title}
                className={`relative rounded-3xl overflow-hidden shadow-xl card-hover ${routesSection.inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0-init'}`}
              >
                <div className={`bg-gradient-to-br ${route.color} p-8 text-white`}>
                  <span className="text-5xl block mb-4">{route.icon}</span>
                  <h3 className="font-oswald font-bold text-2xl mb-2">{route.title}</h3>
                  <div className="flex gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} /> {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} /> {route.distance}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Остановки маршрута</p>
                  <ul className="space-y-2">
                    {route.stops.map((stop, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-600 text-sm">
                        <span className="w-5 h-5 rounded-full bg-krd-orange/15 text-krd-orange text-xs flex items-center justify-center font-bold flex-shrink-0">{j + 1}</span>
                        {stop}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-5 w-full bg-krd-navy hover:bg-krd-deep text-white font-oswald font-semibold py-3 rounded-xl text-sm tracking-wider uppercase transition-colors">
                    Начать маршрут
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-krd-light">
        <div className="container mx-auto px-6">
          <div ref={gallerySection.ref} className="text-center mb-16">
            <span className="text-krd-orange font-oswald font-semibold tracking-widest uppercase text-sm">Визуальный мир</span>
            <h2 className={`font-oswald font-bold text-krd-navy text-5xl md:text-6xl mt-3 ${gallerySection.inView ? 'animate-fade-in-up' : 'opacity-0-init'}`}>
              ГАЛЕРЕЯ
            </h2>
            <p className={`text-gray-500 mt-4 max-w-xl mx-auto ${gallerySection.inView ? 'animate-fade-in-up delay-200' : 'opacity-0-init'}`}>
              Краснодар и его окрестности глазами туристов
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${gallerySection.inView ? 'animate-scale-in' : 'opacity-0-init'}`} style={{ gridAutoRows: '200px' }}>
            <div
              className="gallery-item rounded-2xl overflow-hidden cursor-pointer shadow-lg col-span-2 row-span-2"
              onClick={() => setGalleryActive(0)}
            >
              <img src={IMAGES.hero} alt="Панорама" className="w-full h-full object-cover" />
              <div className="overlay">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-oswald font-bold text-xl">Панорама города</p>
                  <p className="text-white/70 text-sm">Краснодар с высоты</p>
                </div>
              </div>
            </div>

            <div
              className="gallery-item rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => setGalleryActive(1)}
            >
              <img src={IMAGES.street} alt="Красная улица" className="w-full h-full object-cover" />
              <div className="overlay">
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-oswald font-bold">Красная улица</p>
                </div>
              </div>
            </div>

            <div
              className="gallery-item rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => setGalleryActive(2)}
            >
              <img src={IMAGES.sea} alt="Черное море" className="w-full h-full object-cover" />
              <div className="overlay">
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-oswald font-bold">Черноморье</p>
                </div>
              </div>
            </div>

            <div
              className="gallery-item rounded-2xl overflow-hidden col-span-2 cursor-pointer shadow-lg"
              onClick={() => setGalleryActive(3)}
            >
              <img src={IMAGES.vineyards} alt="Виноградники" className="w-full h-full object-cover" />
              <div className="overlay">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-oswald font-bold text-xl">Кубанские виноградники</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-krd-navy text-white font-oswald font-semibold px-8 py-4 rounded-xl uppercase tracking-wider hover:bg-krd-deep transition-colors hover:scale-105 transform">
              <Icon name="Image" size={18} className="inline mr-2" />
              Смотреть все фото
            </button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {galleryActive !== null && (
        <div
          className="fixed inset-0 z-50 bg-krd-navy/95 flex items-center justify-center p-4"
          onClick={() => setGalleryActive(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setGalleryActive(null)}
          >
            <Icon name="X" size={24} />
          </button>
          <img
            src={[IMAGES.hero, IMAGES.street, IMAGES.sea, IMAGES.vineyards][galleryActive]}
            alt=""
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain animate-scale-in"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-sm">
            {['Панорама города', 'Красная улица', 'Черноморское побережье', 'Кубанские виноградники'][galleryActive]}
          </div>
        </div>
      )}

      {/* CTA BANNER */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.sea})` }}
        />
        <div className="absolute inset-0 bg-krd-navy/80" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="font-oswald font-bold text-white text-5xl md:text-7xl mb-6">
            ПЛАНИРУЙ<br /><span className="text-krd-orange">ПОЕЗДКУ</span>
          </h2>
          <p className="text-white/70 text-xl mb-10 max-w-xl mx-auto">
            Лучшее время для визита — с мая по октябрь. Забронируй отель заранее!
          </p>
          <button
            onClick={() => scrollTo('hotels')}
            className="bg-krd-orange hover:bg-orange-600 text-white font-oswald font-bold px-12 py-5 rounded-2xl text-xl tracking-wider uppercase transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40"
          >
            Выбрать отель
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-krd-navy border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-oswald font-bold text-white text-2xl mb-3">
                КРАСНО<span className="text-krd-orange">ДАР</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Туристический гид по Краснодарскому краю. Откройте для себя сердце юга России.
              </p>
            </div>
            <div>
              <h4 className="font-oswald font-semibold text-white uppercase tracking-wider text-sm mb-3">Разделы</h4>
              <ul className="space-y-2">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-white/50 hover:text-krd-orange text-sm transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-oswald font-semibold text-white uppercase tracking-wider text-sm mb-3">Контакты</h4>
              <div className="space-y-2 text-white/50 text-sm">
                <p className="flex items-center gap-2"><Icon name="MapPin" size={14} />г. Краснодар, ул. Красная</p>
                <p className="flex items-center gap-2"><Icon name="Mail" size={14} />info@visitkrasnodar.ru</p>
                <p className="flex items-center gap-2"><Icon name="Phone" size={14} />+7 (861) 200-00-00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
            © 2024 Краснодар — туристический гид. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={() => scrollTo('home')}
        className="fixed bottom-6 right-6 z-40 bg-krd-orange hover:bg-orange-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
      >
        <Icon name="ChevronUp" size={20} />
      </button>
    </div>
  );
}
