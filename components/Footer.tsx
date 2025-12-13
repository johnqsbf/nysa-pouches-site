import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nysa-black text-nysa-muted py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-widest font-sans text-white mb-2">NYSA</h2>
          <p className="text-xs tracking-wider uppercase">The Art of Flavour</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 text-sm font-light text-center">
           <a href="#" className="hover:text-white transition-colors">Instagram</a>
           <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
           <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-xs font-light opacity-50">
          &copy; {new Date().getFullYear()} NYSA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};