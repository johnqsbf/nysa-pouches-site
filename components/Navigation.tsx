import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Idea', id: 'idea', subLabel: 'Our Philosophy' },
  { label: 'Form', id: 'form', subLabel: 'Product & Quality' },
  { label: 'World', id: 'world', subLabel: 'Clients & Context' },
  { label: 'Dialogue', id: 'dialogue', subLabel: 'B2B Partnership' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-6 md:py-8 flex justify-between items-center mix-blend-difference text-white`}
      >
        {/* Logo - Text or Image based on preference, using text for bold impact like reference */}
        <div 
          className="cursor-pointer z-50 font-sans font-bold text-xl md:text-2xl tracking-tighter uppercase" 
          onClick={() => scrollToSection('hero')}
        >
          NYSA
        </div>

        {/* Menu Button */}
        <button 
          className="z-50 flex items-center gap-2 group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hidden md:block text-xs uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">Menu</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-transparent group-hover:bg-white group-hover:text-black transition-all">
             {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </div>
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-nysa-black z-40 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="h-full flex flex-col justify-center items-center gap-8">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group text-center"
            >
              <span className="block font-serif text-5xl md:text-7xl text-nysa-beige group-hover:text-nysa-accent transition-colors duration-300">
                {item.label}
              </span>
              <span className="block text-xs font-sans text-nysa-muted mt-2 tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {item.subLabel}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};