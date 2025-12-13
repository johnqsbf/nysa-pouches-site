import React, { useEffect, useRef } from 'react';

export const EnsoCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // Маленькая точка
  const ensoWrapperRef = useRef<HTMLDivElement>(null); // Контейнер для SVG
  const svgPathRef = useRef<SVGPathElement>(null); // Сам путь мазка кисти

  // Позиции (прячем за экраном при старте)
  const mouse = useRef({ x: -100, y: -100 });
  const ensoPos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Плавность движения
      const speed = 0.1;

      // Вычисляем позиции
      ensoPos.current.x += (mouse.current.x - ensoPos.current.x) * speed;
      ensoPos.current.y += (mouse.current.y - ensoPos.current.y) * speed;
      cursorPos.current.x += (mouse.current.x - cursorPos.current.x) * 0.5;
      cursorPos.current.y += (mouse.current.y - cursorPos.current.y) * 0.5;

      // --- ХАОТИЧНАЯ ГЕНЕРАЦИЯ ЦВЕТА (та же логика, что и раньше) ---
      const time = Date.now() * 0.002; 
      // Используем синусоиды с разной частотой для R, G, B
      const r = Math.floor(Math.sin(time) * 127 + 128);
      const g = Math.floor(Math.sin(time * 1.3 + 2) * 127 + 128);
      const b = Math.floor(Math.sin(time * 1.7 + 4) * 127 + 128);
      
      const chaoticColor = `rgb(${r}, ${g}, ${b})`;

      // Применяем стили
      if (ensoWrapperRef.current && svgPathRef.current) {
        // 1. Движение и Вращение контейнера
        // Увеличил скорость вращения (/ 30) для динамики
        ensoWrapperRef.current.style.transform = `translate3d(${ensoPos.current.x}px, ${ensoPos.current.y}px, 0) translate(-50%, -50%) rotate(${Date.now() / 30}deg)`;
        
        // 2. Применяем цвет к заливке SVG пути
        svgPathRef.current.style.fill = chaoticColor;

        // 3. Добавляем свечение, повторяющее форму мазка (filter drop-shadow лучше, чем box-shadow для SVG)
        // Используем rgba для свечения, чтобы оно было чуть прозрачнее
        ensoWrapperRef.current.style.filter = `drop-shadow(0 0 8px rgba(${r}, ${g}, ${b}, 0.8))`;
      }
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      
      {/* Маленькая точка (центр) - инвертированная */}
      <div 
        ref={cursorRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-white rounded-full opacity-0 md:opacity-100 mix-blend-difference will-change-transform" 
      />

      {/* Контейнер для SVG Энсо */}
      <div 
        ref={ensoWrapperRef}
        // Увеличил размер до w-28 h-28, чтобы детали мазка были видны
        className="absolute top-0 left-0 w-28 h-28 opacity-0 md:opacity-100 transition-opacity duration-500 will-change-transform flex items-center justify-center"
      >
        {/* Встроенный SVG каллиграфического мазка */}
        <svg 
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full overflow-visible"
        >
          {/* Данные пути (path data) для реалистичного мазка кистью */}
          <path
            ref={svgPathRef}
            d="M50,10 C28.5,10 10,28.5 10,50 C10,71.5 28.5,90 50,90 C65,90 78,82 85,70 C87,66 83,62 80,65 C74,75 63,82 50,82 C32,82 18,68 18,50 C18,32 32,18 50,18 C68,18 82,32 82,50 C82,55 81,58 84,58 C87,58 88,54 89,50 C90,28 72,10 50,10 Z M85,30 C82,35 78,38 75,35 C72,32 75,28 78,25 C82,22 88,25 85,30 Z M20,70 C23,65 28,62 31,65 C34,68 31,72 28,75 C24,78 18,75 20,70 Z"
            fill="white" // Начальный цвет, сразу же переопределяется JS
            // Небольшая оптимизация рендеринга
            shapeRendering="geometricPrecision"
          />
        </svg>
      </div>
    </div>
  );
};