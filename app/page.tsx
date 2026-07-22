'use client';

import HeroSection from '@sections/HeroSection';
import ProblemSection from '@sections/ProblemSection';
import TransformationSection from '@sections/TransformationSection';
import PillarsSection from '@sections/PillarsSection';

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

      {/* Problem Section - SPRINT 3 */}
      <ProblemSection
        headline="Tu empresa trabaja mucho. ¿Por qué no crece"
        subheadline="La mayoría de las organizaciones no tienen problema de esfuerzo. Tienen un problema de visión, procesos y alineación. Nosotros conectamos IA, simplificamos procesos y empoderamos personas para que tu negocio crezca sin límites."
        statValue={70}
        statLabel="mejora en eficiencia"
        ctaLabel="Agenda una consulta gratuita"
        onCTA={handleDiagnosis}
      />

      {/* Transformation Section - SPRINT 5 */}
      <TransformationSection
        beforeVideo="/videos/transformation-before.mp4"
        afterVideo="/videos/transformation-after.mp4"
        beforePoster="/images/transformation-before.jpg"
        afterPoster="/images/transformation-after.jpg"
        beforeLabel="Caos"
        afterLabel="Orden"
        headline="No necesitas aprender tecnología nueva. Usamos lo que ya tienes."
        subheadline="Transforma tu operación manteniendo lo que funciona"
        ctaLabel="Ver más transformaciones"
        onCTA={handleViewWork}
      />

      {/* Pillars Section - SPRINT 4 */}
      <PillarsSection
        headline="Mi enfoque: los tres pilares trabajando juntos, no por separado"
        subheadline="No soy un especialista en una sola cosa. La solución que tu empresa necesita vive en la intersección de IA, procesos bien diseñados y personas empoderadas."
      />
    </main>
  );
}
