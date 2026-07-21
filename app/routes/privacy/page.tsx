export const metadata = {
  title: 'Política de Privacidad',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="container-md py-20">
        <h1 className="text-h2 mb-8">Política de Privacidad</h1>

        <div className="prose prose-sm max-w-none text-body text-fg-muted space-y-6">
          <section>
            <h2 className="text-h4 text-fg mb-4">Introducción</h2>
            <p>
              Tu privacidad es importante para nosotros. Esta política de privacidad explica cómo
              recopilamos, utilizamos y protegemos tu información personal.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Información que Recopilamos</h2>
            <p>Recopilamos información que proporcionas voluntariamente, como:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Nombre y correo electrónico</li>
              <li>Mensajes y solicitudes</li>
              <li>Información de uso del sitio web</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Cómo Usamos Tu Información</h2>
            <p>Utilizamos tu información para:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Responder a tus solicitudes</li>
              <li>Mejorar nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Contacto</h2>
            <p>Si tienes preguntas sobre esta política, ponte en contacto con nosotros.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
