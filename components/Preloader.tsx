import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  // Логика плавного исчезновения
  useEffect(() => {
    if (!isLoading) {
      // Ждем, пока пройдет CSS анимация прозрачности (1000мс), потом удаляем из DOM
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 1000); 
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-1000 ease-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Контейнер видео */}
      <div className="w-full h-full relative overflow-hidden">
        <video
          src="./loader.mp4" // Убедитесь, что файл loader.mp4 лежит в папке public
          autoPlay
          muted
          loop
          playsInline // Обязательно для iPhone
          className="w-full h-full object-cover" // object-cover растягивает видео на весь экран без полос
        />
        
        {/* Затемнение поверх видео (опционально), чтобы текст загрузки читался лучше */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Текст или Логотип поверх видео (по центру) */}
      <div className="absolute z-10 flex flex-col items-center gap-4">
          {/* Если хотите логотип поверх видео */}
          {/* <img src="/nysa.png" className="w-32 animate-pulse" /> */}
          
          <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-sans animate-pulse">
            Loading Experience
          </div>
      </div>
    </div>
  );
};