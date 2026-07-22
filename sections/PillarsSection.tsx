'use client';

import { motion } from 'framer-motion';
import { useInViewAnimation } from '@hooks';
import { easings, durations } from '@lib/motion';
import PillarCard from '@components/molecules/PillarCard';

interface Pillar {
  id: string;
  title: string;
  description: string;
  example: string;
  iconType: 'ai' | 'process' | 'people';
  colorAccent: string;
}

interface PillarsSectionProps {
  headline?: string;
  subheadline?: string;
  pillars?: Pillar[];
}

/**
 * PillarsSection - Sección de los 3 pilares con cards 3D
 *
 * Características:
 * - Grid responsivo: 3 cols (desktop), 2 cols (tablet), 1 col (mobile)
 * - Cada card con 3D + glassmorphism
 * - Reveal animations staggered en scroll
 * - Máx width 1280px centrado
 * - Accesibilidad: semantic HTML + aria labels
 * - Respeta prefers-reduced-motion
 * - Performance: transform only, GPU accelerated
 */
export const PillarsSection: React.FC<PillarsSectionProps> = ({
  headline = 'Mi enfoque: los tres pilares trabajando juntos, no por separado',
  subheadline = 'No soy un especialista en una sola cosa. La solución que tu empresa necesita vive en la intersección de IA, procesos bien diseñados y personas empoderadas.',
  pillars = [
    {
      id: 'ia',
      title: 'IA para simplificar',
      description:
        'Implementamos IA donde realmente genera impacto, no en todas partes. Automatizamos lo que aburre, amplificamos lo que importa.',
      example: 'Pasamos tu libreta de ventas al celular de tu equipo en 1 semana',
      iconType: 'ai',
      colorAccent: '#2E5BFF',
    },
    {
      id: 'process',
      title: 'Procesos que funcionan',
      description:
        'Mapeamos, simplificamos y estandarizamos tus procesos clave. Menos caos. Más eficiencia. Menos tiempo en reuniones.',
      example: 'Flujo de trabajo optimizado: -40% tiempo en tareas administrativas',
      iconType: 'process',
      colorAccent: '#10B981',
    },
    {
      id: 'people',
      title: 'Equipos que innovan de verdad',
      description:
        'Desarrollamos líderes y equipos que toman decisiones rápidas basadas en datos, no en intuición. Cultura de experimentación.',
      example: 'Cultura de innovación: +3x ideas nuevas implementadas por trimestre',
      iconType: 'people',
      colorAccent: '#8B5CF6',
    },
  ],
}) => {
  const { ref: sectionRef, isInView } = useInViewAnimation({
    once: true,
    amount: 0.1,
  });

  // Headline animation
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
      },
    },
  };

  // Subheadline animation
  const subheadlineVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
        delay: 0.1,
      },
    },
  };

  // Grid animation
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-paper overflow-hidden"
      aria-label="Los tres pilares"
    >
      {/* Background accent (subtle) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 800px at center top, rgba(46, 91, 255, 0.05), transparent)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-start gap-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header: Headline + Subheadline */}
          <div className="flex flex-col gap-6 max-w-3xl">
            {/* Headline */}
            <motion.h2
              className="text-h2 font-bold text-fg leading-tight"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              }}
              variants={headlineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {headline}
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-fg-muted leading-relaxed max-w-2xl"
              variants={subheadlineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {subheadline}
            </motion.p>
          </div>

          {/* Cards Grid */}
          <motion.div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6"
            variants={gridVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {pillars.map((pillar, index) => (
              <div key={pillar.id} className="perspective">
                <PillarCard
                  title={pillar.title}
                  description={pillar.description}
                  example={pillar.example}
                  iconType={pillar.iconType}
                  colorAccent={pillar.colorAccent}
                  delay={index * 0.15}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PillarsSection;
