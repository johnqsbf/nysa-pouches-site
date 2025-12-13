import React, { useEffect, useRef } from 'react';

const jarItems = [
  // 1. PEACH: Верхний ЛЕВЫЙ угол (0% по Y)
  { id: 1, src: './peach_top.png', left: '2%', initialY: 0, speed: 0.3, rotate: 0.5, scale: 0.8 },
  
  // 2. MANGO: Верхний ПРАВЫЙ угол
  { id: 2, src: './mango_top.png', left: '85%', initialY: 100, speed: 0.5, rotate: -0.7, scale: 1.1 },
  
  // 3. PEPPERMINT: Левый край, чуть ниже
  { id: 3, src: './peppermint_top.png', left: '15%', initialY: 250, speed: 0.2, rotate: 1.0, scale: 0.6 },
  
  // 4. SWEETMINT: Правый край, середина
  { id: 4, src: './sweetmint_top.png', left: '90%', initialY: 400, speed: 0.4, rotate: 0.3, scale: 0.9 },
  
  // 5. PEACH 2: НИЖНИЙ ПРАВЫЙ УГОЛ (Разнесли далеко от первого)
  { id: 5, src: './peach_top.png', left: '80%', initialY: 850, speed: 0.6, rotate: -0.5, scale: 0.7 },
  
  // 6. BANANA: Левый низ
  { id: 6, src: './banana_top.png', left: '5%', initialY: 600, speed: 0.3, rotate: 0.6, scale: 0.5 },
  
  // 7. MACCHIATO: Центр (под формой)
  { id: 7, src: './macchiato_top.png', left: '45%', initialY: 750, speed: 0.4, rotate: -0.2, scale: 1.3 },
  
  // 8. BUZZLE: Левый нижний угол
  { id: 8, src: './buzzle_top.png', left: '20%', initialY: 900, speed: 0.5, rotate: 0.8, scale: 0.8 },
];

export const Dialogue: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const jarsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Начинаем анимацию, когда верх секции касается низа экрана
      const offset = Math.max(0, windowHeight - rect.top);
      
      // 1. Анимация БАНОК
      jarsRefs.current.forEach((jar, index) => {
        if (!jar) return;
        const data = jarItems[index];
        // Двигаем вверх
        const moveY = offset * data.speed * 1.5; 
        const rotation = offset * 0.1 * data.rotate;
        
        jar.style.transform = `translate3d(0, -${moveY}px, 0) rotate(${rotation}deg) scale(${data.scale})`;
      });

      // 2. Анимация ПОЯВЛЕНИЯ ФОРМЫ
      if (contentRef.current) {
        if (rect.top < windowHeight * 0.7) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        } else {
          contentRef.current.style.opacity = '0';
          contentRef.current.style.transform = 'translateY(50px)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="dialogue" 
      ref={sectionRef} 
      className="relative bg-white text-nysa-black overflow-hidden pt-32 pb-48 min-h-screen"
    >
      
      {/* СЛОЙ БАНОК (Задний план) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         {jarItems.map((jar, index) => (
           <div
             key={jar.id}
             ref={(el) => (jarsRefs.current[index] = el)}
             className="absolute will-change-transform"
             style={{
               left: jar.left,
               // Стартовая позиция: Низ секции (100%) + индивидуальное смещение
               // Они ждут внизу и вылетают вверх при скролле
               top: `calc(100% + ${jar.initialY}px)`, 
             }}
           >
             <img 
               src={jar.src} 
               alt="" 
               className="w-24 md:w-48 h-auto object-contain drop-shadow-2xl" 
             />
           </div>
         ))}
      </div>

      {/* СЛОЙ КОНТЕНТА (Передний план) */}
      <div 
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 transition-all duration-1000 ease-out opacity-0 translate-y-12"
      >
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-6">Let's Create a Shared Space.</h2>
          <p className="font-sans font-light text-lg text-nysa-dark max-w-2xl mx-auto bg-white/60 backdrop-blur-sm p-4 rounded-xl">
            We are not looking for just any point of sale. We are looking for partners—places with character that understand their clients expect something more.
          </p>
        </div>
        
        <div className="w-full h-[400px] mb-24 overflow-hidden relative group rounded-sm shadow-2xl">
           <img 
             src="./1.png" 
             alt="Shared Space Context" 
             className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105" 
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 py-16 mb-24 bg-white/90 backdrop-blur-md rounded-xl p-8 border border-gray-100">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl">What Makes Us Different?</h3>
            <ul className="space-y-3 font-sans font-light text-nysa-dark">
              <li>• A standout product</li>
              <li>• Full B2B support</li>
              <li>• In-demand innovation</li>
            </ul>
          </div>
          
          <div className="space-y-6 md:border-l md:border-r border-black/10 md:px-8">
            <h3 className="font-serif text-2xl">Who We're Looking For</h3>
            <ul className="space-y-3 font-sans font-light text-nysa-dark">
              <li>• Distributors in FMCG/HoReCa</li>
              <li>• Ambitious regional partners</li>
              <li>• Teams that value design</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-2xl">What You Get</h3>
            <ul className="space-y-3 font-sans font-light text-nysa-dark">
              <li>• Access to exclusive SKUs</li>
              <li>• Competitive pricing</li>
              <li>• Launch support</li>
            </ul>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 relative">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl mb-2">Begin the Dialogue</h3>
            <p className="text-nysa-muted font-light text-sm">Fill out the form to receive our B2B catalogue.</p>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-nysa-muted">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-black/20 p-3 focus:outline-none focus:border-nysa-accent transition-colors font-serif text-xl" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-nysa-muted">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-black/20 p-3 focus:outline-none focus:border-nysa-accent transition-colors font-serif text-xl" placeholder="email@company.com" />
            </div>
            <div className="pt-8 text-center">
              <button className="bg-nysa-black text-white px-12 py-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-nysa-accent transition-colors duration-300">
                Send Request
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};