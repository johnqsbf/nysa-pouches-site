import React, { useEffect, useRef, useState } from 'react';

// Медиа компонент
const MediaItem: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.mov');
  
  return (
    <div className={`relative overflow-hidden bg-gray-900 shadow-2xl ${className}`}>
      {isVideo ? (
        <video 
          src={src} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img 
          src={src} 
          alt="Context" 
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export const World: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Refs для управления колонками
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);
  const col5Ref = useRef<HTMLDivElement>(null);

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Вычисляем, насколько мы проскроллили ВНУТРЬ секции
      const relativeScroll = scrollY - sectionTop;

      // --- ЛОГИКА ДВИЖЕНИЯ КОЛОНОК ---
      // Чтобы они не отставали, используем множители скорости > 1.0
      
      // Колонка 1 (Снизу вверх)
      if (col1Ref.current) {
        const yPos = windowHeight * 1.2 - (relativeScroll * 1.2); 
        col1Ref.current.style.transform = `translateY(${yPos}px)`;
      }

      // Колонка 2 (Сверху вниз)
      if (col2Ref.current) {
        const yPos = -windowHeight * 1.2 + (relativeScroll * 1.4);
        col2Ref.current.style.transform = `translateY(${yPos}px)`;
      }

      // Колонка 3 (Центр): ИСПРАВЛЕНО
      // Теперь движется вертикально Снизу Вверх (как 1 и 4), но немного быстрее, 
      // чтобы пролететь центр и не перекрывать текст слишком долго.
      if (col3Ref.current) {
        // Стартует ниже экрана (1.5 экрана) и летит вверх со скоростью 1.5
        const yPos = windowHeight * 1.5 - (relativeScroll * 1.5);
        // Убрали боковое смещение, теперь чисто вертикально и синхронно
        col3Ref.current.style.transform = `translateY(${yPos}px)`;
      }

      // Колонка 4 (Снизу вверх)
      if (col4Ref.current) {
        const yPos = windowHeight * 1.6 - (relativeScroll * 1.6);
        col4Ref.current.style.transform = `translateY(${yPos}px)`;
      }

      // Колонка 5 (Сверху вниз)
      if (col5Ref.current) {
        const yPos = -windowHeight * 1.0 + (relativeScroll * 1.1);
        col5Ref.current.style.transform = `translateY(${yPos}px)`;
      }

      // СМЕНА ФОНА (Light Mode)
      if (relativeScroll > windowHeight * 1.5) {
        setIsLightMode(true);
      } else {
        setIsLightMode(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="world" 
      ref={sectionRef}
      // Высота секции для длинного скролла
      className={`relative min-h-[300vh] border-t border-white/10 transition-colors duration-700 ease-in-out ${
        isLightMode ? 'bg-white text-nysa-black' : 'bg-black text-white'
      }`}
    >
      
      {/* 1. Сетка фона (Sticky, Z-0) */}
      <div className="sticky top-0 h-screen w-full grid grid-cols-2 md:grid-cols-5 pointer-events-none z-0 overflow-hidden">
        <div className={`border-r h-full transition-colors duration-700 ${isLightMode ? 'border-black/10' : 'border-white/10'}`}></div>
        <div className={`border-r h-full hidden md:block transition-colors duration-700 ${isLightMode ? 'border-black/10' : 'border-white/10'}`}></div>
        <div className={`border-r h-full hidden md:block transition-colors duration-700 ${isLightMode ? 'border-black/10' : 'border-white/10'}`}></div>
        <div className={`border-r h-full hidden md:block transition-colors duration-700 ${isLightMode ? 'border-black/10' : 'border-white/10'}`}></div>
        <div className="h-full"></div>
      </div>

      {/* 2. Контейнер с "летающими" колонками (Sticky, Z-10) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10 pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-5 h-full w-full">
            
            {/* Колонка 1 */}
            <div ref={col1Ref} className="flex flex-col p-4 md:p-0 will-change-transform">
               <MediaItem src="./1.png" className="w-full aspect-[3/4] mt-12 md:mx-8 md:w-[80%]" />
               <MediaItem src="./7.mp4" className="w-full aspect-square mt-24 md:ml-12 md:w-[70%]" />
            </div>

            {/* Колонка 2 */}
            <div ref={col2Ref} className="hidden md:flex flex-col items-center will-change-transform">
               <MediaItem src="./4.mp4" className="w-[90%] aspect-[9/16] mt-12" />
               <MediaItem src="./6.jpg" className="w-[80%] aspect-square mt-12" />
            </div>

            {/* Колонка 3 (Центр) */}
            <div ref={col3Ref} className="hidden md:flex flex-col justify-center items-center will-change-transform opacity-90">
               {/* 3.mov сверху */}
               <MediaItem src="./3.mov" className="w-full aspect-video mb-12" />
               {/* 9.mp4 снизу */}
               <MediaItem src="./9.mp4" className="w-[80%] aspect-[3/4] mt-12" />
            </div>

            {/* Колонка 4 */}
            <div ref={col4Ref} className="hidden md:flex flex-col items-end pt-24 will-change-transform">
               <MediaItem src="./2.png" className="w-[85%] aspect-square mr-4" />
               <MediaItem src="./8.mp4" className="w-[70%] aspect-[3/4] mt-24 mr-8" />
            </div>

            {/* Колонка 5 */}
            <div ref={col5Ref} className="flex flex-col p-4 md:p-0 justify-start will-change-transform">
               <MediaItem src="./5.jpg" className="w-full aspect-[3/4] md:w-[80%] md:ml-8 mt-24" />
            </div>

        </div>
      </div>

      {/* 3. Текст по центру (Sticky, Z-30 - Поверх всего) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
         <div className="sticky top-0 h-screen flex flex-col justify-center items-center text-center">
            {/* Добавил легкое размытие фона под текстом (backdrop-blur-sm), чтобы читалось лучше, если видео проходит под ним */}
            <div className={`p-8 md:p-12 transition-colors duration-700 backdrop-blur-sm rounded-3xl ${isLightMode ? 'mix-blend-normal bg-white/30' : 'mix-blend-difference'}`}>
              <span className={`block text-xs font-sans tracking-[0.3em] uppercase mb-6 animate-pulse transition-colors duration-700 ${isLightMode ? 'text-nysa-accent' : 'text-white/80'}`}>
                The New Context
              </span>
              <h2 className={`font-sans text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] transition-colors duration-700 ${isLightMode ? 'text-nysa-black' : 'text-white'}`}>
                It’s not a <br/>
                target group. <br/>
                It’s a world.
              </h2>
              
              <div className="mt-16 pointer-events-auto">
                <a href="#dialogue" className={`inline-flex items-center gap-2 border px-10 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                  isLightMode 
                    ? 'border-black text-black hover:bg-black hover:text-white' 
                    : 'border-white/30 text-white hover:bg-white hover:text-black bg-black/20'
                }`}>
                  Join the Movement
                </a>
              </div>
            </div>
         </div>
      </div>

    </section>
  );
};