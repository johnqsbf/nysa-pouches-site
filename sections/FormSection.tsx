import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

const products: Product[] = [
  { 
    id: 1, 
    name: 'Polar Mint', 
    category: 'Mint', 
    description: 'Absolute zero. White noise. The essence of cold in its most pure form.', 
    image: './polarmint.png', 
    accentColor: 'bg-blue-500' 
  },
  { 
    id: 2, 
    name: 'Peppermint', 
    category: 'Mint', 
    description: 'Cold precision. Sharp mind. A classic defined by clarity and rhythm.', 
    image: './peppermint.png', 
    accentColor: 'bg-teal-600' 
  },
  { 
    id: 3, 
    name: 'Spearmint', 
    category: 'Mint', 
    description: 'Garden rain. Soft green. A gentle approach to freshness.', 
    image: './spearmint.png', 
    accentColor: 'bg-emerald-500' 
  },
  { 
    id: 4, 
    name: 'Sweetmint', 
    category: 'Mint', 
    description: 'Sugar whisper. Gentle cool. Balanced breath with a delicate finish.', 
    image: './sweetmint.png', 
    accentColor: 'bg-green-400' 
  },
  { 
    id: 5, 
    name: 'Lemon Cola', 
    category: 'Fruit', 
    description: 'Fizz and depth. Dark citrus. An ironic spark with effervescent body.', 
    image: './lemoncola.png', 
    accentColor: 'bg-yellow-600' 
  },
  { 
    id: 6, 
    name: 'Mango', 
    category: 'Fruit', 
    description: 'Solar flare. Juicy pulse. Tropical heat captured in a golden moment.', 
    image: './mango.png', 
    accentColor: 'bg-orange-500' 
  },
  { 
    id: 7, 
    name: 'Pineapple', 
    category: 'Fruit', 
    description: 'Sharp gold. Acid sun. Vibrant energy with a crisp edge.', 
    image: './pineapple.png', 
    accentColor: 'bg-lime-500' 
  },
  { 
    id: 8, 
    name: 'Banana', 
    category: 'Fruit', 
    description: 'Velvet texture. Soft curve. Creamy nostalgia with a rounded finish.', 
    image: './banana.png', 
    accentColor: 'bg-yellow-400' 
  },
  { 
    id: 9, 
    name: 'Buzzle Gum', 
    category: 'Other', 
    description: 'Electric pink. Pop culture. A playful rebellion of neon nostalgia.', 
    image: './buzzle.png', 
    accentColor: 'bg-pink-500' 
  },
  { 
    id: 10, 
    name: 'Macchiatamore', 
    category: 'Other', 
    description: 'Roasted silence. Italian shadow. Deep body with the taste of stillness.', 
    image: './macciatamore.png', 
    accentColor: 'bg-[#4a3630]'
  },
];

export const FormSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activeColor, setActiveColor] = useState(products[0].accentColor);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const track = trackRef.current;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = sectionTop;
      
      if (scrollY < start) {
        track.style.transform = `translateX(0px)`;
        return;
      }

      let progress = (scrollY - start) / (sectionHeight - windowHeight);
      progress = Math.max(0, Math.min(progress, 1)); 

      const maxTranslate = track.scrollWidth - window.innerWidth;
      const translateX = progress * maxTranslate;

      track.style.transform = `translateX(-${translateX}px)`;

      // Логика смены цвета
      const activeIndex = Math.min(
        products.length - 1,
        Math.floor(progress * products.length)
      );
      
      setActiveColor(products[activeIndex].accentColor);

      // На мобильных: snap к ближайшему продукту
      if (isMobile) {
        const snapThreshold = 0.05; // 5% порог для snap
        const idealProgress = activeIndex / (products.length - 1);
        const diff = Math.abs(progress - idealProgress);
        
        if (diff < snapThreshold) {
          const snapTranslate = (activeIndex / (products.length - 1)) * maxTranslate;
          track.style.transform = `translateX(-${snapTranslate}px)`;
          track.style.transition = 'transform 0.3s ease-out';
        } else {
          track.style.transition = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section 
      id="form" 
      ref={sectionRef}
      className={`relative h-[600vh] transition-colors duration-700 ease-in-out ${activeColor}`}
    >
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Track */}
        <div 
          ref={trackRef} 
          className="flex h-full items-center will-change-transform"
        >
          
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="min-w-[100vw] h-screen w-screen flex items-center justify-center relative px-6 md:px-20"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl items-center gap-12 md:gap-24">
                  
                  {/* Text Content */}
                  <div className="order-2 md:order-1 space-y-6 md:space-y-8">
                     <div className="flex items-center gap-4 text-white/60 font-sans tracking-[0.2em] text-xs uppercase">
                        <span>0{index + 1}</span>
                        <span className="w-8 h-px bg-white/40"></span>
                        <span>{product.category}</span>
                     </div>

                     <h2 className="font-serif text-5xl md:text-8xl text-white leading-none">
                       {product.name}
                     </h2>
                     
                     <p className="font-sans text-lg md:text-xl text-white/90 font-light max-w-md leading-relaxed drop-shadow-sm">
                       {product.description}
                     </p>

                     <div className="pt-8">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="px-8 py-3 border border-white/40 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                        >
                          View Details
                        </button>
                     </div>
                  </div>

                  {/* Image Content */}
                  <div className="order-1 md:order-2 flex justify-center items-center h-[40vh] md:h-[60vh] relative group">
                     <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/20 rounded-full blur-3xl scale-75 group-hover:scale-90 transition-transform duration-1000"></div>
                     
                     <img 
                       src={product.image} 
                       alt={product.name}
                       className="relative z-10 w-full h-full object-contain drop-shadow-2xl scale-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                     />
                  </div>

               </div>
            </div>
          ))}

        </div>
      </div>

      {/* Статичные элементы */}
      <div className="fixed bottom-8 left-8 text-white/50 text-xs uppercase tracking-[0.3em] pointer-events-none mix-blend-overlay z-20">
        Collection {products.length} Items
      </div>

      <div className="absolute top-8 right-8 text-white/10 font-sans font-black text-6xl md:text-9xl pointer-events-none select-none mix-blend-overlay hidden xl:block sticky z-20">
        COLLECTION
      </div>

      {/* МОДАЛЬНОЕ ОКНО (POPUP) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          
          {/* Фон (Backdrop) с размытием */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Карточка продукта */}
          <div className="relative bg-white text-nysa-black w-full max-w-2xl rounded-sm overflow-hidden shadow-2xl animate-fade-in-up">
            
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={24} className="text-black" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Левая часть: Картинка */}
              <div className={`relative flex items-center justify-center p-8 ${selectedProduct.accentColor.replace('bg-', 'bg-opacity-20 bg-')}`}>
                 <div className={`absolute inset-0 opacity-10 ${selectedProduct.accentColor}`}></div>
                 <img 
                   src={selectedProduct.image} 
                   alt={selectedProduct.name} 
                   className="w-48 h-auto object-contain drop-shadow-xl relative z-10 transform hover:scale-110 transition-transform duration-500"
                 />
              </div>

              {/* Правая часть: Информация */}
              <div className="p-10 flex flex-col justify-center space-y-8">
                 <div>
                   <h3 className="font-serif text-4xl mb-2">{selectedProduct.name}</h3>
                   <span className="text-xs font-bold tracking-[0.2em] uppercase text-nysa-muted">{selectedProduct.category}</span>
                 </div>

                 <p className="font-sans font-light text-gray-600 leading-relaxed">
                   {selectedProduct.description}
                 </p>

                 {/* Выбор крепости */}
                 <div className="space-y-3">
                   <span className="text-xs font-bold uppercase tracking-widest text-black">Strength (Nicotine)</span>
                   <div className="flex flex-wrap gap-3">
                      {['4 MG', '8 MG', '12 MG', '20 MG'].map((strength) => (
                        <button 
                          key={strength}
                          className="px-4 py-2 border border-black/10 text-xs font-bold hover:bg-black hover:text-white transition-all duration-300 rounded-sm"
                        >
                          {strength}
                        </button>
                      ))}
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};