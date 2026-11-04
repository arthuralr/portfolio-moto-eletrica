import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, PhoneCall, Shield } from 'lucide-react';
import { CONTATO_CONFIG } from '../data/motos.ts';

interface HeaderProps {
  onOpenTestRide: () => void;
  onNavigateToAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTestRide, onNavigateToAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (1 Primary CTA) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <span>
              Volt<span className="text-cyan-400">Moto</span>
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#catalogo"
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              Modelos
            </a>
            <a
              href="#diferenciais"
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              Diferenciais
            </a>
            <a
              href="#calculadora"
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              Calculadora
            </a>
            <a
              href="#sobre"
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              A Concessionária
            </a>
            {onNavigateToAdmin ? (
              <button
                onClick={onNavigateToAdmin}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-slate-400 hover:text-white"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Painel Lojista
              </button>
            ) : (
              <a
                href="/admin"
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-slate-400 hover:text-white"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Painel Lojista
              </a>
            )}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTestRide}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg hover:from-cyan-300 hover:to-emerald-300 transition-all duration-200 shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0 active:scale-95"
            >
              Agendar Test-Ride
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTestRide}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-md"
            >
              Test-Ride
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 backdrop-blur-xl">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-300">
            <a
              href="#catalogo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Modelos e Catálogo
            </a>
            <a
              href="#diferenciais"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Diferenciais Elétricos
            </a>
            <a
              href="#calculadora"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Calculadora de Economia
            </a>
            <a
              href="#sobre"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              A Concessionária
            </a>
            {onNavigateToAdmin && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToAdmin();
                }}
                className="text-left text-cyan-400 font-semibold flex items-center gap-2 py-1"
              >
                <Shield className="w-4 h-4" />
                Acessar Painel Lojista (Admin)
              </button>
            )}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTestRide();
                }}
                className="w-full py-3 text-center text-sm font-bold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300"
              >
                Agendar Test-Ride Exclusivo
              </button>
              <a
                href={`tel:${CONTATO_CONFIG.telefone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 text-xs text-slate-400 py-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Ligue: {CONTATO_CONFIG.telefone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
