import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Регистрируем плагин один раз
gsap.registerPlugin(ScrollTrigger);

export const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refs для видео части
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs для манифеста
  const introRef = useRef<HTMLDivElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // 1. АНИМАЦИЯ МАНИФЕСТА (Текст в начале)
  useGSAP(() => {
    if (!introRef.current) return;

    // Простое появление текста при скролле (как "вырисовывание")
    gsap.fromTo(introRef.current, 
      { autoAlpha: 0, y: 50 }, 
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 85%", // Когда верх элемента достигает 85% экрана
          end: "top 40%",   // Заканчиваем анимацию ближе к центру
          scrub: 1,         // Привязка к скроллу (1 сек задержка для плавности)
        }
      }
    );
  }, { scope: containerRef });

  // 2. АНИМАЦИЯ ВИДЕО (PIN + SCRUB)
  useGSAP(() => {
    // Ждем загрузки видео и наличия элементов
    if (!isVideoLoaded || !videoSectionRef.current || !videoRef.current || !textContainerRef.current) return;

    const video = videoRef.current;
    
    // Создаем мастер-таймлайн для секции
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoSectionRef.current,
        start: "top top", // Фиксируем, когда верх секции касается верха экрана
        end: "+=500%",    // Длина фиксации (5 экранов)
        pin: true,        // Закрепляем
        scrub: 0.5,       // Плавность скролла
      }
    });

    // ШАГ 1: Прокрутка видео (Scrubbing)
    // Используем call, чтобы убедиться, что duration корректный
    if (video.duration) {
      tl.to(video, {
        currentTime: video.duration,
        ease: "none",
        duration: 10 // Условная длительность в рамках timeline
      });
    }

    // ШАГ 2: Появление текста (Method/Result)
    // Начинаем появление за 2 секунды до конца прокрутки видео
    tl.fromTo(textContainerRef.current, 
      { autoAlpha: 0, x: -20 }, 
      { 
        autoAlpha: 1, 
        x: 0, 
        duration: 3, 
        ease: "power2.out" 
      }, 
      "-=2" 
    );

  }, { scope: containerRef, dependencies: [isVideoLoaded] });

  return (
    <section ref={containerRef} id="idea" className="bg-white text-nysa-black relative">
      
      {/* --- БЛОК 1: МАНИФЕСТ (Обычный поток) --- */}
      <div className="relative z-10 px-6 pt-32 pb-24 max-w-[90%] mx-auto bg-white">
        <div className="flex items-end justify-between border-b border-black pb-6 mb-16">
           <span className="text-xs font-bold tracking-[0.2em] uppercase">Manifesto</span>
           <span className="text-xs font-bold tracking-[0.2em] uppercase hidden md:block">01 — Philosophy</span>
        </div>

        {/* Текст Манифеста */}
        <div ref={introRef} className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-12 opacity-0 translate-y-12">
          <p className="mb-8">
            We are not just manufacturers. <br/>
            We are <span className="italic font-light text-nysa-accent">curators of sensation.</span>
          </p>
          <p className="indent-12 md:indent-32 opacity-80">
            NYSA bridges the gap between biological need and aesthetic desire. 
            We believe that flavor is a cultural code—a way to speak without words.
          </p>
        </div>

        <div className="w-full h-px bg-black/10 mt-24"></div>
      </div>


      {/* --- БЛОК 2: ВИДЕО СЦЕНА (Sticky) --- */}
      <div 
        ref={videoSectionRef} 
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        
        {/* Видео слой */}
        <video
          ref={videoRef}
          src="./manifest.mov" 
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          onLoadedMetadata={() => setIsVideoLoaded(true)}
        />

        {/* Текстовый слой: Слева Сверху, Столбиком */}
        <div 
          ref={textContainerRef}
          className="absolute inset-0 z-10 pt-32 px-6 md:px-12 flex flex-col items-start justify-start opacity-0 pointer-events-none"
        >
           <div className="max-w-xl">
              
              {/* THE METHOD */}
              <div className="mb-16">
                 <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-nysa-accent mb-6">The Method</h3>
                 <div className="w-12 h-px bg-black/50 mb-6"></div>
                 <p className="font-sans font-light text-xl leading-relaxed text-black drop-shadow-md">
                   Minimalism is our primary tool. We strip away the unnecessary noise to reveal the pure essence of the ingredients. No fillers, just flavor.
                 </p>
              </div>

              {/* THE RESULT */}
              <div>
                 <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-nysa-accent mb-6">The Result</h3>
                 <div className="w-12 h-px bg-black/50 mb-6"></div>
                 <p className="font-sans font-light text-xl leading-relaxed text-black drop-shadow-md">
                   A product that sits quietly in the background, yet defines the moment. Clean, discreet, and profoundly impactful.
                 </p>
              </div>

           </div>
        </div>

      </div>

    </section>
  );
};