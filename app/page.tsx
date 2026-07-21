'use client';

import { motion } from 'framer-motion';
import { Button, Kicker, Card } from '@components/atoms';
import { fadeInVariants, slideUpVariants } from '@lib/motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="container-wide py-20">
        <motion.div
          className="space-y-4 mb-12"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <Kicker color="brand">BIENVENIDA</Kicker>
          <h1 className="text-h1">Full-Stack Developer & Digital Creator</h1>
          <p className="text-body text-fg-muted max-w-2xl">
            Construyo experiencias digitales excepcionales que transforman ideas en realidad.
            Especializándome en arquitectura escalable y diseño centrado en el usuario.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4 mb-20"
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Button variant="primary" size="lg">
            Ver Proyectos
          </Button>
          <Button variant="outline" size="lg">
            Contactar
          </Button>
        </motion.div>

        {/* Grid de componentes de demostración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          <Card variant="elevated" padding="lg">
            <h3 className="text-h4 mb-2">Componentes Base</h3>
            <p className="text-body text-fg-muted mb-4">
              Sistema de diseño completo con componentes reutilizables y accesibles.
            </p>
          </Card>

          <Card variant="elevated" padding="lg">
            <h3 className="text-h4 mb-2">Animations & Motion</h3>
            <p className="text-body text-fg-muted mb-4">
              Framer Motion integrado para transiciones suaves y delightful UX.
            </p>
          </Card>

          <Card variant="elevated" padding="lg">
            <h3 className="text-h4 mb-2">TypeScript Strict</h3>
            <p className="text-body text-fg-muted mb-4">
              Tipado completo para mayor seguridad y mantenibilidad del código.
            </p>
          </Card>

          <Card variant="elevated" padding="lg">
            <h3 className="text-h4 mb-2">Tailwind CSS v4</h3>
            <p className="text-body text-fg-muted mb-4">
              Utilidades de última generación para estilos consistentes y responsivos.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
