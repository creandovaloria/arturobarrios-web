'use client';

import HeroSection from '@sections/HeroSection';

export default function Home() {
  const handleDiagnosis = () => {
    // TODO: Implementar lógica para agenda
    console.log('Agendar diagnóstico gratuito');
  };

  const handleViewWork = () => {
    // TODO: Implementar scroll a portfolio
    console.log('Ver cómo trabajo');
  };

  return (
    <main className="min-h-screen bg-paper overflow-hidden">
      {/* Hero Section Premium */}
      <HeroSection
        backgroundVideo="/videos/hero-background.mp4"
        posterImage="/images/hero-poster.jpg"
        headline="Tu negocio ya funciona. Nosotros lo hacemos"
        subheadline="Conectando IA • Simplificando Procesos • Empoderando Personas"
        morphingWords={['crecer', 'escalar', 'transformar']}
        ctaLabel1="Agenda tu diagnóstico gratuito"
        ctaLabel2="Ver cómo trabajo"
        onCTA1={handleDiagnosis}
        onCTA2={handleViewWork}
      />

      {/* Placeholder para siguiente sección */}
      <section className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-h2 mb-4">Próxima Sección</h2>
          <p className="text-body text-fg-muted">Contenido adicional</p>
        </div>
      </section>
    </main>
  );
}
