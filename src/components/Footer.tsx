import React from 'react';
import { Zap, Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { CONTATO_CONFIG } from '../data/motos.ts';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols on large screen) */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-white mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <span>
                Volt<span className="text-cyan-400">Moto</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              A concessionária referência em motocicletas elétricas de alta performance no Brasil. Redefinindo os limites da velocidade sustentável com engenharia de ponta, emissão zero e torque instantâneo.
            </p>
            <div className="text-xs text-slate-500">
              CNPJ: 45.892.110/0001-44 · VoltMoto Mobilidade Sustentável Ltda.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#catalogo" className="hover:text-cyan-400 transition-colors">
                  Catálogo de Motos
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-cyan-400 transition-colors">
                  Vantagens do Elétrico
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-cyan-400 transition-colors">
                  Simulador de Economia
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-cyan-400 transition-colors">
                  Showroom Jardins
                </a>
              </li>
              <li>
                <a href="#/admin" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                  Painel Administrativo (Lojista)
                </a>
              </li>
            </ul>
          </div>

          {/* Modelos */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Modelos em Destaque
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#catalogo" className="hover:text-cyan-400 transition-colors">
                  Volt Custom Chopper 1000W
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-cyan-400 transition-colors">
                  Volt Jet Urban Flow 1000W
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-cyan-400 transition-colors">
                  Volt MotoChefe Beast 1000W
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-cyan-400 transition-colors">
                  Volt Classic Vintage 1000W
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Atendimento Showroom
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{CONTATO_CONFIG.endereco}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${CONTATO_CONFIG.telefone.replace(/\D/g, '')}`} className="hover:text-white">
                  {CONTATO_CONFIG.telefone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${CONTATO_CONFIG.email}`} className="hover:text-white">
                  {CONTATO_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">{CONTATO_CONFIG.horario}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VoltMoto Concessionária. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-slate-400 cursor-pointer">Garantia & Manuais</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
