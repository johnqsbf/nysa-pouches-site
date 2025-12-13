import React, { useRef, useState, useEffect } from 'react';
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
  const [videoSource, setVideoSource] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  // Определяем источник видео при монтировании компонента
  useEffect(() => {
    const checkMobile = window.innerWidth < 768;
    setIsMobile(checkMobile);
    const source = checkMobile ? './manifest-optimized.mp4' : './manifest.mov';
    setVideoSource(source);
  }, []);

  // 1. АНИМАЦИЯ МАНИФЕСТА (Текст в начале)
  useGSAP(() => {
    if (!introRef.current) return;

    gsap.fromTo(introRef.current, 
      { autoAlpha: 0, y: 50 }, 
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  // 2. АНИМАЦИЯ ВИДЕО (PIN + SCRUB)
  useGSAP(() => {
    if (!isVideoLoaded || !videoSectionRef.current || !videoRef.current || !textContainerRef.current) return;

    const video = videoRef.current;
    
    // Для iOS: принудительная загрузка видео
    if (isMobile) {
      video.load();
      // Попытка воспроизведения для инициализации
      video.play().then(() => {
        video.pause();
        video.currentTime = 0;
      }).catch(() => {
        // Игнорируем ошибки автоплея
      });
    }
    
    // Создаем мастер-таймлайн для секции
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoSectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Альтернативный метод для iOS: прямое управление currentTime
          if (video.duration) {
            const targetTime = self.progress * video.duration;
            // Используем requestAnimationFrame для плавности
            requestAnimationFrame(() => {
              video.currentTime = targetTime;
            });
          }
        }
      }
    });

    // Только для десктопа используем GSAP анимацию видео
    if (!isMobile && video.duration) {
      tl.to(video, {
        currentTime: video.duration,
        ease: "none",
        duration: 10
      });
    } else {
      // Для мобильных создаем пустую анимацию той же длительности
      tl.to({}, { duration: 10 });
    }

    // ШАГ 2: Появление текста
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

  }, { scope: containerRef, dependencies: [isVideoLoaded, isMobile] });

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
          <p className="opacity-80">
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
        {videoSource && (
          <video
            ref={videoRef}
            src={videoSource}
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            className="absolute inset-0 w-full h-full object-cover z-0"
            onLoadedMetadata={() => setIsVideoLoaded(true)}
            onCanPlayThrough={() => {
              // Дополнительная проверка готовности для iOS
              if (videoRef.current && videoRef.current.readyState >= 3) {
                setIsVideoLoaded(true);
              }
            }}
          />
        )}

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