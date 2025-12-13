import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { Philosophy } from './sections/Philosophy';
import { FormSection } from './sections/FormSection';
import { World } from './sections/World';
import { Dialogue } from './sections/Dialogue';
import { Footer } from './components/Footer';
import { EnsoCursor } from './components/EnsoCursor';
import { Preloader } from './components/Preloader'; // Импортируем прелоадер

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Функция завершения загрузки
    const handleLoad = () => {
      // Добавляем небольшую задержку, чтобы анимация была плавной и заметной
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); 
    };

    // Проверяем, загружена ли уже страница (например, при обновлении)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Если нет, ждем события load (все картинки, скрипты, видео)
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-nysa-black text-nysa-black cursor-none">
      
      {/* 1. Прелоадер (Показывается поверх всего, пока isLoading = true) */}
      <Preloader isLoading={isLoading} />

      {/* 2. Курсор (Появляется сразу, но виден будет после прелоадера) */}
      <EnsoCursor />
      
      {/* 3. Основной контент */}
      {/* Можно добавить плавное появление контента, когда загрузка завершена */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        
        <main className="relative z-10">
          <Hero />
          <Philosophy />
          <FormSection />
          <World />
          <Dialogue />
        </main>

        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;