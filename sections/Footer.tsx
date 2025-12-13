import React from 'react';
import { Instagram, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 border-t border-white/10 overflow-hidden relative min-h-screen flex flex-col justify-between">
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-between">
         
         {/* Top Section: Grid Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-32">
            
            {/* Left Column: Brand Info */}
            <div className="lg:col-span-4 space-y-8">
               <div>
                 <h2 className="font-sans font-bold text-3xl tracking-tight mb-4">NYSA</h2>
                 <p className="text-xs uppercase tracking-[0.3em] text-white/40">The Art of Flavour</p>
               </div>
               
               <p className="font-sans text-white/60 leading-relaxed max-w-sm">
                 We unite decades of expertise in crafting unique taste experiences, redefining possibilities in premium beverage design.
               </p>
               
               <div className="space-y-3">
                 <p className="text-sm text-white/80">Stockholm, Sweden</p>
                 <a href="mailto:hello@nysa.com" className="text-sm hover:text-nysa-accent transition-colors block">
                   hello@nysa.com
                 </a>
                 
                 <div className="flex gap-3 pt-4">
                   <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                     <Instagram size={16} />
                   </a>
                   <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                     <Linkedin size={16} />
                   </a>
                   <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                     <Mail size={16} />
                   </a>
                 </div>
               </div>
            </div>

            {/* Middle Column: Navigation */}
            <div className="lg:col-span-3 space-y-8">
               <span className="block text-xs font-sans tracking-[0.25em] uppercase text-white/40">Navigate</span>
               <nav className="space-y-4">
                  <a href="#idea" className="block text-xl font-serif hover:text-nysa-accent transition-colors">Philosophy</a>
                  <a href="#form" className="block text-xl font-serif hover:text-nysa-accent transition-colors">Collection</a>
                  <a href="#world" className="block text-xl font-serif hover:text-nysa-accent transition-colors">The World</a>
                  <a href="#dialogue" className="block text-xl font-serif hover:text-nysa-accent transition-colors">Dialogue</a>
               </nav>
            </div>

            {/* Right Column: CTA */}
            <div className="lg:col-span-5">
               <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
                 Ready to kick start a <span className="text-nysa-accent">discovery session?</span>
               </h3>
               <p className="font-sans text-white/60 mb-8">
                 Share your ideas with us, and we'll begin turning your vision into reality today.
               </p>
               
               <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                 <div className="flex items-center border-b border-white/30 pb-3 transition-colors group-hover:border-white/60">
                   <input 
                     type="email" 
                     placeholder="Enter your email" 
                     className="bg-transparent flex-grow focus:outline-none text-lg placeholder:text-white/30 text-white"
                     required
                   />
                   <button 
                     type="submit" 
                     className="text-xs uppercase tracking-[0.2em] hover:text-nysa-accent transition-colors flex items-center gap-2"
                   >
                     Subscribe <ArrowUpRight size={14} />
                   </button>
                 </div>
               </form>
            </div>
         </div>

         {/* Bottom Section: Legal & Credits */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 gap-8 relative z-20">
            <div className="flex flex-col md:flex-row gap-6 text-xs uppercase tracking-[0.2em] text-white/40">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
               <span>© {new Date().getFullYear()} NYSA Studios AB</span>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
            >
              Back to Top 
              <ArrowUpRight 
                className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" 
                size={14} 
              />
            </button>
         </div>
      </div>
      
      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none select-none z-0">
        <h1 className="font-sans font-bold text-[28vw] md:text-[32vw] tracking-tighter text-white opacity-[0.04] text-center transform translate-y-[12%]">
          NYSA
        </h1>
      </div>

    </footer>
  );
};