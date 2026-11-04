'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header.tsx';
import { HeroSlider } from '../components/HeroSlider.tsx';
import { CatalogoMotos } from '../components/CatalogoMotos.tsx';
import { Diferenciais } from '../components/Diferenciais.tsx';
import { CalculadoraEconomia } from '../components/CalculadoraEconomia.tsx';
import { SobreConcessionaria } from '../components/SobreConcessionaria.tsx';
import { Footer } from '../components/Footer.tsx';
import { ModalDetalhesMoto } from '../components/ModalDetalhesMoto.tsx';
import { ModalTestRide } from '../components/ModalTestRide.tsx';
import { ModalPainelLojista } from '../components/ModalPainelLojista.tsx';
import { MOTOS_ELETRICAS, MotoEletrica, CONTATO_CONFIG } from '../data/motos.ts';
import { MessageCircle, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigateToMoto?: (id: string) => void;
  onNavigateToAdmin?: () => void;
  onOpenGlobalTestRide?: (modelName?: string) => void;
}

export default function HomePage({ onNavigateToMoto, onNavigateToAdmin, onOpenGlobalTestRide }: HomePageProps) {
  const [motoSelecionadaId, setMotoSelecionadaId] = useState<string | null>(null);
  const [isTestRideOpen, setIsTestRideOpen] = useState<boolean>(false);
  const [modeloPreSelecionado, setModeloPreSelecionado] = useState<string | undefined>(undefined);
  const [isPainelLojistaOpen, setIsPainelLojistaOpen] = useState<boolean>(false);

  const motoSelecionada: MotoEletrica | null = motoSelecionadaId
    ? MOTOS_ELETRICAS.find((m) => m.id === motoSelecionadaId) || null
    : null;

  const handleOpenTestRide = (modelName?: string) => {
    if (onOpenGlobalTestRide) {
      onOpenGlobalTestRide(modelName);
    } else {
      setModeloPreSelecionado(modelName);
      setIsTestRideOpen(true);
    }
  };

  const handleSelectMoto = (id: string) => {
    if (onNavigateToMoto) {
      onNavigateToMoto(id);
    } else {
      setMotoSelecionadaId(id);
    }
  };

  const handleAbrirAdmin = () => {
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    } else {
      setIsPainelLojistaOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation */}
      <Header
        onOpenTestRide={() => handleOpenTestRide()}
        onNavigateToAdmin={handleAbrirAdmin}
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* Dynamic Photographic Carousel Hero Section */}
        <HeroSlider
          onOpenTestRide={(modelName) => handleOpenTestRide(modelName || 'Volt Custom Chopper 1000W')}
          onSelectMoto={(id) => handleSelectMoto(id)}
        />

        {/* Realistic Motorcycle Showcase / Catalog */}
        <CatalogoMotos
          onSelectMoto={(id) => handleSelectMoto(id)}
          onOpenTestRideWithModel={(modelName) => handleOpenTestRide(modelName)}
        />

        {/* Interactive Differentials & Comparison Matrix */}
        <Diferenciais />

        {/* Interactive Cost & Savings Calculator */}
        <CalculadoraEconomia />

        {/* Dealership Showroom & Trust Pillars */}
        <SobreConcessionaria onOpenTestRide={() => handleOpenTestRide()} />
      </main>

      {/* Floating Direct WhatsApp Button */}
      <a
        href={`https://wa.me/${CONTATO_CONFIG.telefoneWhatsapp}?text=${encodeURIComponent(
          'Olá, equipe VoltMoto! Gostaria de conversar com um especialista sobre as motos autopropelidas sem CNH à pronta-entrega.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/40 transition-transform hover:scale-110 active:scale-95 group"
      >
        <MessageCircle className="w-7 h-7 fill-slate-950" />
        <span className="sr-only">Falar no WhatsApp</span>
      </a>

      {/* Footer */}
      <Footer />

      {/* Technical Detail Modal */}
      <ModalDetalhesMoto
        moto={motoSelecionada}
        onClose={() => setMotoSelecionadaId(null)}
        onOpenTestRide={(modelName) => handleOpenTestRide(modelName)}
      />

      {/* Test-Ride Booking Lead Modal */}
      <ModalTestRide
        isOpen={isTestRideOpen}
        onClose={() => {
          setIsTestRideOpen(false);
          setModeloPreSelecionado(undefined);
        }}
        modeloPreSelecionado={modeloPreSelecionado}
      />

      {/* Fast In-Page Storekeeper Admin Modal */}
      <ModalPainelLojista
        isOpen={isPainelLojistaOpen}
        onClose={() => setIsPainelLojistaOpen(false)}
        onNavigateToMoto={(id) => handleSelectMoto(id)}
      />
    </div>
  );
}
