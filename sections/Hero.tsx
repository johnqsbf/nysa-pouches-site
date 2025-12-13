import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* 1. Слой с Видео (Фон) */}
      <div className="absolute inset-0 z-0">
        <video 
          src="./colors.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Слой-маска (Белый блок с "дыркой" в форме логотипа) */}
      {/* mix-blend-screen делает черные элементы внутри этого блока прозрачными */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center bg-white mix-blend-screen p-6">
        
        {/* Логотип - Выворотка */}
        <div className="flex-grow flex items-center justify-center w-full">
          <img 
            src="./nysa.png" 
            alt="NYSA" 
            // w-[80vw] = 80% от ширины экрана
            // blur-sm = легкое размытие краев (как вы просили)
            className="w-[80vw] max-w-none h-auto object-contain blur-sm"
          />
        </div>

        {/* Текст внизу (тоже будет работать как выворотка, если цвет text-black) */}
        <div className="absolute bottom-12 w-full px-12 flex justify-between items-end text-black">
           <div className="hidden md:block text-xs uppercase tracking-widest font-bold">
             Premium Nicotine Pouches<br/>
           </div>
           
           <div className="text-right">
             <p className="font-serif italic text-2xl md:text-3xl font-bold">The Art of Flavour</p>
           </div>
        </div>

      </div>
    </section>
  );
};